import req from 'supertest';
import { connect, disconnect } from '../server.js';
import db from '../db/index.js';
import Playlist from '../db/models/playlist.js';

const samplePlaylists = [{
  name: 'ANON Summit Playlist',
  items: [{
    name: 'ANON Summit 2020 | DAY 1 | PART 1',
    url: 'https://www.youtube.com/watch?v=90ZpotXDf8M'
  }, {
    name: 'ANON Summit 2020 | DAY 1 | PART 2',
    url: 'https://www.youtube.com/watch?v=wln1dGUfEGI'
  }]
}, {
  name: 'Pokémon Playlist',
  items: [{
    name: 'Pokémon: The First Movie Trailer',
    url: 'https://www.youtube.com/watch?v=hX-NHafvY5I'
  }, {
    name: 'Pokémon: Lucario and the Mystery of Mew Trailer',
    url: 'https://www.youtube.com/watch?v=7vc-FhG682E'
  }]
}];

let server;

function sendAndExpectReq(method, uri, options) {
  const { payload, expectedStatus } = options || {};

  let promise = req(server)[method.toLowerCase()](uri);

  if (payload) {
    promise = promise.send(payload);
  }

  return promise
    .expect(expectedStatus || 200)
    .expect('Content-Type', /json/);
}

function createAndExpectSamplePlaylist(sample, toObject) {
  const deferred = sendAndExpectReq('POST', '/playlist', { payload: sample })
    .expect(({ body: { data }}) => {
      expect(data.id).toBeDefined();
      expect(data.name).toEqual(sample.name);
      expect(data.items).toEqual(
        expect.arrayContaining(sample.items.map(item => (
          expect.objectContaining(item)
        )))
      );
    });

  if (toObject) {
    return deferred.then(({ body: { data }}) => data);
  }

  return deferred;
}

function expectSamplePlaylistById(id, expectedStatus) {
  return sendAndExpectReq('GET', `/playlist/${id}`, { expectedStatus });
}

describe('Route /playlist', () => {
  beforeAll(async () => {
    await db.connect();
    server = await connect();
  });

  beforeEach(async () => {
    await Playlist.deleteMany({});
  });

  afterAll(async () => {
    await db.disconnect();
    await disconnect();
    server = null;
  });

  test('It should create a playlist', () => (
    createAndExpectSamplePlaylist(samplePlaylists[0])
  ));

  test('It should return all playlists', async () => {
    const playlist1 = await createAndExpectSamplePlaylist(samplePlaylists[0], true)
        , playlist2 = await createAndExpectSamplePlaylist(samplePlaylists[1], true);

    await sendAndExpectReq('GET', '/playlist')
      .expect(({ body: { data }}) => {
        expect(data instanceof Array).toBeTruthy();
        expect(data.length).toEqual(2);
        expect(data[0].id).toEqual(playlist1.id);
        expect(data[1].id).toEqual(playlist2.id);
      });
  });

  test('It should return a playlist by ID', async () => {
    const playlist = await createAndExpectSamplePlaylist(samplePlaylists[0], true);

    await createAndExpectSamplePlaylist(samplePlaylists[1]);
    await expectSamplePlaylistById(playlist.id)
      .expect({ data: playlist });
  });

  test('It should update a playlist', async () => {
    const playlistUpdate = {
          name: 'New Playlist Name'
        }
        , playlist1 = await createAndExpectSamplePlaylist(samplePlaylists[0], true)
        , playlist2 = await createAndExpectSamplePlaylist(samplePlaylists[1], true);

    await sendAndExpectReq('PUT', `/playlist/${playlist1.id}`, { payload: playlistUpdate })
      .expect(({ body: { data }}) => {
        expect(data.id).toEqual(playlist1.id);
        expect(data.name).toEqual(playlistUpdate.name);
      });

    await expectSamplePlaylistById(playlist2.id)
      .expect(({ body: { data }}) => {
        expect(data.id).toEqual(playlist2.id);
        expect(data.name).toEqual(playlist2.name);
      });
  });

  test('It should delete a playlist', async () => {
    const playlist = await createAndExpectSamplePlaylist(samplePlaylists[0], true);

    await expectSamplePlaylistById(playlist.id)
      .expect({ data: playlist });

    await sendAndExpectReq('DELETE', `/playlist/${playlist.id}`)
      .expect({ data: 1 });

    await expectSamplePlaylistById(playlist.id, 404);
  });
});

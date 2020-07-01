import { connect, disconnect } from '../lib/server.js';
import db from '../lib/db/index.js';
import Playlist from '../lib/db/models/Playlist.js';
import Video from '../lib/db/models/Video.js';
import { sendAndExpectReq } from './utils.js';

const samplePlaylist = {
      name: 'ANON Summit Playlist',
      items: [{
        name: 'ANON Summit 2020 | DAY 1 | PART 1',
        url: 'https://www.youtube.com/watch?v=90ZpotXDf8M'
      }]
    }
    , sampleTag = {
      label: 'My First Tag',
      timestamp: {
        start: 0,
        end: 6000
      }
    };

let server, sendAndExpectReqToServer;

describe('A user', () => {
  beforeAll(async () => {
    await db.connect();
    server = await connect();
    sendAndExpectReqToServer = sendAndExpectReq(server);
  });

  beforeEach(async () => {
    await Playlist.deleteMany({});
    await Video.deleteMany({});
  });

  afterAll(async () => {
    await db.disconnect();
    await disconnect();
    server = null;
  });

  test('Should be able to create a playlist and update video tags', async () => {
    const { body: { data: { items: [ video ] }}} = await sendAndExpectReqToServer('POST', '/api/playlist', { payload: samplePlaylist })
        , { body: { data: { tags }}} = await sendAndExpectReqToServer('POST', `/api/video/${video.id}/tags`, { payload: sampleTag });

    expect(tags).toEqual(
      expect.arrayContaining([
        expect.objectContaining(sampleTag)
      ])
    );
  });
});

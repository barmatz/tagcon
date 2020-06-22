import { connect, disconnect } from '../server.js';
import db from '../db/index.js';
import Video from '../db/models/Video.js';
import { sendAndExpectReq } from '../../tests/utils.js';

const sampleVideos = [{
  name: 'ANON Summit 2020 | DAY 1 | PART 1',
  url: 'https://www.youtube.com/watch?v=90ZpotXDf8M',
  tags: [{
    label: 'My First Tag',
    timestamp: {
      start: 0,
      end: 6000
    }
  }, {
    label: 'My Second Tag',
    timestamp: {
      start: 3000,
      end: 9000
    }
  }]
}, {
  name: 'ANON Summit 2020 | DAY 1 | PART 2',
  url: 'https://www.youtube.com/watch?v=wln1dGUfEGI',
  tags: [{
    label: 'My First Tag',
    timestamp: {
      start: 0,
      end: 6000
    }
  }, {
    label: 'My Second Tag',
    timestamp: {
      start: 3000,
      end: 9000
    }
  }]
}];

let server, sendAndExpectReqToServer;

function createAndExpectSampleVideo(sample, toObject) {
  const deferred = sendAndExpectReqToServer('POST', '/video', { payload: sample })
    .expect(({ body: { data }}) => {
      expect(data.id).toBeDefined();
      expect(data.url).toEqual(sample.url);
      expect(data.tags).toEqual(
        expect.arrayContaining(sample.tags.map(item => (
          expect.objectContaining(item)
        )))
      );
    });

  if (toObject) {
    return deferred.then(({ body: { data }}) => data);
  }

  return deferred;
}

function expectSampleVideoById(id, expectedStatus) {
  return sendAndExpectReqToServer('GET', `/video/${id}`, { expectedStatus });
}

describe('Route /video', () => {
  beforeAll(async () => {
    await db.connect();
    server = await connect();
    sendAndExpectReqToServer = sendAndExpectReq(server);
  });

  beforeEach(async () => {
    await Video.deleteMany({});
  });

  afterAll(async () => {
    await db.disconnect();
    await disconnect();
    server = null;
  });

  test('It should create a video', () => (
    createAndExpectSampleVideo(sampleVideos[0])
  ));

  test('It should return all videos', async () => {
    const video1 = await createAndExpectSampleVideo(sampleVideos[0], true)
        , video2 = await createAndExpectSampleVideo(sampleVideos[1], true);

    await sendAndExpectReqToServer('GET', '/video')
      .expect(({ body: { data }}) => {
        expect(data instanceof Array).toBeTruthy();
        expect(data.length).toEqual(2);
        expect(data[0].id).toEqual(video1.id);
        expect(data[1].id).toEqual(video2.id);
      });
  });

  test('It should return a video by ID', async () => {
    const video = await createAndExpectSampleVideo(sampleVideos[0], true);

    await createAndExpectSampleVideo(sampleVideos[1]);
    await expectSampleVideoById(video.id)
      .expect({ data: video });
  });

  test('It should update a video', async () => {
    const videoUpdate = {
          name: 'New Video Name'
        }
        , video1 = await createAndExpectSampleVideo(sampleVideos[0], true)
        , video2 = await createAndExpectSampleVideo(sampleVideos[1], true);

    await sendAndExpectReqToServer('PUT', `/video/${video1.id}`, { payload: videoUpdate })
      .expect(({ body: { data }}) => {
        expect(data.id).toEqual(video1.id);
        expect(data.name).toEqual(videoUpdate.name);
      });

    await expectSampleVideoById(video2.id)
      .expect(({ body: { data }}) => {
        expect(data.id).toEqual(video2.id);
        expect(data.name).toEqual(video2.name);
      });
  });

  test('It should delete a video', async () => {
    const video = await createAndExpectSampleVideo(sampleVideos[0], true);

    await expectSampleVideoById(video.id)
      .expect({ data: video });

    await sendAndExpectReqToServer('DELETE', `/video/${video.id}`)
      .expect({ data: 1 });

    await expectSampleVideoById(video.id, 404);
  });
});

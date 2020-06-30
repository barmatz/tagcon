import req from 'supertest';
import { connect, disconnect } from '../server.js';

describe('Route /', () => {
  let server;

  beforeEach(async () => {
    server = await connect();
  });

  afterEach(async () => {
    await disconnect();
    server = null;
  });

  test('It should response the GET method', async () => (
    req(server)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200, {
        data: {
          message: 'TagCon API'
        }
      })
  ));
});

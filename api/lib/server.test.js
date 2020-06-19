import req from 'supertest';
import { connect, disconnect } from './server.js';

describe('Server', () => {
  let server;

  beforeEach(async () => {
    server = await connect();
  });

  afterEach(async () => {
    await disconnect();
    server = null;
  });

  test('It should connect', async () => (
    req(server)
      .get('/ping')
      .expect(200, 'pong')
  ));
});

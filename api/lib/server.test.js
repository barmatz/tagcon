import req from 'supertest';
import server, { connect, disconnect } from './server.js';

describe('Server', () => {
  beforeEach(async () => {
    await connect();
  });

  afterEach(async () => {
    await disconnect();
  });

  test('It should connect', async () => {
    const { statusCode, text } = await req(server).get('/ping');

    expect(statusCode).toBe(200);
    expect(text).toBe('pong');
  });
});

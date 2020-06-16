import req from 'supertest';
import server, { connect, disconnect } from '../server';

describe('Route /', () => {
	beforeEach(async () => {
		await connect();
	});

	afterEach(async () => {
		await disconnect();
	});

	test('It should response the GET method', async () => {
		const { statusCode, body: { data: { message }}} = await req(server).get('/');
		
		expect(statusCode).toBe(200);
		expect(message).toBe('TagCon API');
	});
});

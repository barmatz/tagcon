import req from 'supertest';

import server, { connect, disconnect } from '../server';

describe('Route /playlist', () => {
	beforeEach(async () => {
		await connect();
	});

	afterEach(async () => {
		await disconnect();
	});

	test('It should return a playlist', async () => {
		const { statusCode, body: { data: { id, items }}} = await req(server).get('/playlist');
		
		expect(statusCode).toBe(200);
		expect(id).toBeDefined();
		expect(items).toBeDefined();
		expect(items instanceof Array).toBeTruthy();

		if (items.length > 0) {
			const item = items[0];

			expect(item.id).toBeDefined();
			expect(typeof item.id).toBe('number');
		}
	});

	test('It should return a playlist by ID', async () => {
		const playlistId = 2
				, { statusCode, body: { data: { id }}} = await req(server).get(`/playlist/${playlistId}`);

		expect(statusCode).toBe(200);
		expect(id).toBeDefined();
		expect(id).toEqual(playlistId);
	})
});

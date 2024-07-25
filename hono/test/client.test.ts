import {AppType} from './server.js';
import {hc} from 'hono/client';
import {describe, it} from 'vitest';

const clientTest = hc < AppType > ('/api');
describe('', () => {
	it('', async () => {
		const res = await clientTest.hello.$get({
			query: {
				name: 'Hono',
			},
		});
		const data = await res.json();
		console.log(`${data.message}`);
	});
});

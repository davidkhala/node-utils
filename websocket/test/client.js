import WebsocketClient from '../client.js';


const logger = console;
describe('websocket', function () {
	this.timeout(0);
	it('connect', async () => {
		const wsUrl = 'ws://localhost:3003';
		const client = new WebsocketClient(wsUrl, undefined, logger);

		await client.connect();
		client.close();
	});
});

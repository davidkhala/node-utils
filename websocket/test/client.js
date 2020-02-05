const WebsocketClient = require('../client');
const wsUrl = 'ws://localhost:3003';
const ws = new WebsocketClient(wsUrl);
const logger = console;
ws.ws.on('open', (event) => {
	logger.debug('onOpen', {event});
	setTimeout(() => {
		ws.ws.terminate();
	}, 1000);
});
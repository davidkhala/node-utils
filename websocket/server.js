const WebSocket = require('ws');

class WebsocketServer {
	/**
	 *
	 * @param {http.Server} server A pre-created HTTP/S server to use
	 * @param {function} [listeningCB] A listener for the `listening` event
	 * @param [logger]
	 */
	constructor(server, listeningCB, logger = console) {
		this.wss = new WebSocket.Server({server}, listeningCB);
		this.logger = logger;
	}

	currentClients() {
		return Array.from(this.wss.clients);// typeof wss.clients === 'Set'
	}

	touch(ws) {
		if (ws.isAlive === false) {
			return ws.terminate();
		}

		ws.isAlive = false;
		ws.ping(() => {
		});
	}

	setHeartBeat(beatInterval) {
		const heartBeat = () => {
			const clientsArray = this.currentClients();
			this.logger.debug('ws heartBeat', 'clients pool size', clientsArray.length);

			clientsArray.forEach((ws, index) => {

				if (!ws.index) {// TODO use another indicator for remark
					ws.index = index;
				}
				if (ws.isAlive === false) {
					return ws.terminate();
				}

				ws.isAlive = false;
				ws.ping(() => {
				});
			});
		};
		setInterval(heartBeat, beatInterval);
	}

//	TODO
//	wss.on('connection', (ws) => {
// 		ws.isAlive = true;
// 		logger.debug('connection');
// 		ws.on('pong', () => {
// 			ws.isAlive = true;
// 		});
// 		heartBeat();
}

module.exports = WebsocketServer;

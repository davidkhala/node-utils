import {WebSocketServer as Server}  from 'ws';

export default class WebsocketServer {
	/**
	 *
	 * @param {http.Server} server A pre-created HTTP/S server to use
	 * @param {function} [listeningCB] A listener for the `listening` event
	 * @param [logger]
	 */
	constructor(server, listeningCB, logger = console) {
		this.wss = new Server({server}, listeningCB);
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

	/**
	 *
	 * @param {number} beatInterval interval timeout
	 */
	setHeartBeat(beatInterval) {
		const heartBeat = () => {
			const clientsArray = this.currentClients();


			for (const ws of clientsArray) {
				this.logger.debug('wss heartBeat', `client domain[${ws.domain}]`, `among ${clientsArray.length}`);
			}
			// clientsArray.forEach((ws, index) => {
			//

			//
			// 	TODO
			// 	ws.ping((a, b, c, d) => {
			// 		console.info(a, b, c, d);
			// 	});
			// });
		};
		setInterval(heartBeat, beatInterval);
	}
}

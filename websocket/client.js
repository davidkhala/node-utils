import WebSocket from 'ws';

export default class WebsocketClient {
	constructor(url, options = {}, logger = console) {
		Object.assign(this, options, {url});
		this.logger = logger;
	}

	async connect() {
		const {url} = this;
		const ws = new WebSocket(url, undefined, this);
		return new Promise((resolve) => {
			ws.on('open', () => {
				this.logger.debug('onOpen');
				this.ws = ws;
				resolve();
			});

		});
	}

	/**
	 *
	 * @param {WebsocketEventType} eventType
	 * @return {*}
	 */
	currentListeners(eventType) {
		return this.ws.listeners(eventType);
	}

	/**
	 *
	 * @param {WebsocketEventType} eventType
	 * @param {function} [listener]
	 */
	clearEventListener(eventType, listener) {
		const listeners = this.currentListeners(eventType);
		if (listener) {
			this.ws.removeEventListener(eventType, listener);
		} else {
			this.logger.debug('clearEventListener', `all of eventType[${eventType}]`);
			for (const listenerEach of listeners) {
				this.ws.removeEventListener(eventType, listenerEach);
			}
		}
	}

	/**
	 *
	 * @param {Number} [code] Status code explaining why the connection is closing
	 * @param {String} [data] A string explaining why the connection is closing
	 * @param {boolean} [force] Forcibly destroys the socket without closing frames or fin packets exchange,
	 *  and does it instantly, without any timeout.
	 */
	close({code, data, force} = {}) {
		if (force) {
			this.ws.terminate();
		} else {
			this.ws.close(code, data);
		}
		delete this.ws;
	}
}

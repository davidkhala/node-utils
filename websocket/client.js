const WebSocket = require('ws');
class WebsocketClient {
	constructor(wsUrl, options = {}, logger = console) {
		this.ws = new WebSocket(wsUrl, undefined, options);
		this.logger = logger;
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
}

module.exports = WebsocketClient;
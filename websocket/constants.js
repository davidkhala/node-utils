/**
 * @enum {string}
 */
const WebsocketState = {
	CONNECTING: 'CONNECTING',
	OPEN: 'OPEN',
	CLOSING: 'CLOSING',
	CLOSED: 'CLOSED'
};
exports.WebsocketState = WebsocketState;

/**
 * @enum {string}
 */
const WebsocketEventType = {
	open: 'open',
	message: 'message',
	close: 'close',
	error: 'error',
	connection: 'connection',
	pong: 'pong'
};
exports.WebsocketEventType = WebsocketEventType;
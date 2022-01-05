/**
 * @enum {string}
 */
export const WebsocketState = {
	CONNECTING: 'CONNECTING',
	OPEN: 'OPEN',
	CLOSING: 'CLOSING',
	CLOSED: 'CLOSED'
};

/**
 * @enum {string}
 */
export const WebsocketEventType = {
	open: 'open',
	message: 'message',
	close: 'close',
	error: 'error',
	connection: 'connection',
	pong: 'pong'
};
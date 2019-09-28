exports.container = {
	config: '/opt/activemq/conf',
	data: '/opt/activemq/data'
};


class STOMP {
	static globalSetup() {
		const polyfill = {};
		if (typeof WebSocket !== 'function') {
			polyfill.WebSocket = require('ws');
		}
		if (typeof TextEncoder !== 'function') {
			const {TextEncoder, TextDecoder} = require('text-encoding');
			polyfill.TextEncoder = TextEncoder;
			polyfill.TextDecoder = TextDecoder;
		}
		Object.assign(global, polyfill);
	}

	constructor({brokerURL}) {
		STOMP.globalSetup();

		const StompJs = require('@stomp/stompjs');
		const client = new StompJs.Client({
			brokerURL,
			debug: console.debug,
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
			// connectHeaders: {
			// 	login: "user",
			// 	passcode: "password"
			// },
		});

		client.onConnect = (frame) => {
			console.log('onConnect', frame);
		};
		client.onStompError = (frame) => {
			// Will be invoked in case of error encountered at Broker
			// Bad login/passcode typically will cause an error
			// Complaint brokers will set `message` header with a brief message. Body may contain details.
			// Compliant brokers will terminate the connection after any error
			console.log('Broker reported error: ' + frame.headers['message']);
			console.log('Additional details: ' + frame.body);
		};
		this.client = client;
	}

	connect() {
		this.client.activate();
	}

	close() {
		this.client.deactivate();
		delete this.client.onConnect;
		delete this.client.onStompError;
	}
}

exports.STOMP = STOMP;


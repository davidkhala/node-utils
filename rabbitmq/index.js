const AMPQlib = require('amqplib');

class AMPQ {
	constructor(url) {
		this.url = url;
	}

	async send(topic, message) {
		const status = await this.channel.assertQueue(topic);
		return await this.channel.sendToQueue(topic, Buffer.from(message));
	}

	async subscribe(topic, listener) {
		const status = await this.channel.assertQueue(topic);
		return this.channel.consume(topic, listener);
	}

	ack(message) {
		this.channel.ack(message);
	}

	async connect() {
		this.client = await AMPQlib.connect(this.url);
		this.channel = await this.client.createChannel();
	}
}

exports.AMPQ = AMPQ;
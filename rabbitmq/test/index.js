const {AMPQ} = require('../index');
const instance = new AMPQ('amqp://localhost');
const topic = 'tasks';
const task = async () => {

	await instance.connect();
	const listener = (message) => {
		if (message) {
			console.log(message.content.toString());
			instance.ack(message);
		}
	};
	await instance.subscribe(topic, listener);
	await instance.send(topic, 'b');
};

task();
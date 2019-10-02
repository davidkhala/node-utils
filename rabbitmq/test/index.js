const {AMPQ} = require('../index');
const instance = new AMPQ({username: 'user', password: 'bitnami'});
const topic = 'tasks';
const task = async () => {

	await instance.connect();
	const listener = async (message) => {
		if (message) {
			console.log(message.content.toString());
			instance.ack(message);
			await instance.close()
		}
	};
	await instance.subscribe(topic, listener);
	await instance.send(topic, 'b');
};

task();

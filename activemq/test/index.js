const {STOMP} = require('../index');
const brokerURL = 'ws://localhost:61614';
const conn = new STOMP({brokerURL});
const sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};
const task = async () => {

	conn.connect();
	await sleep(10000);
	conn.close();
};
task();



const {SQS} = require('../sqs');
const region = 'ap-southeast-1';
const sqs = new SQS(region);
const queue = 'topicA';
const sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};
const task = async () => {
	await sqs.create(queue);
	let queues = await sqs.list();
	console.debug(queues);

	await sqs.destroy(queues[0]);
	queues = await sqs.list();
	console.debug('immediate after deletion', queues);
	await sleep(61000);
	queues = await sqs.list();
	console.debug('60 seconds after deletion', queues);
};
task();



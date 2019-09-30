const {SQS} = require('../sqs');
const region = 'ap-southeast-1';
const sqs = new SQS(region);
const queue = 'topicA';
const sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};
const destroyTask = async () => {
	let queues = await sqs.list();
	await sqs.destroy(queues[0]);
	queues = await sqs.list();
	console.debug('immediate after deletion', queues);
	const sleepTime = 61000;
	await sleep(sleepTime);
	queues = await sqs.list();
	console.debug(`${sleepTime / 1000} seconds after deletion`, queues);
};
const task = async () => {
	await sqs.create(queue);
	await destroyTask();

};
destroyTask();



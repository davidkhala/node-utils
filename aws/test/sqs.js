const {SQS} = require('../sqs');
const region = 'ap-southeast-1';
const sqs = new SQS(region);
const queue = 'topicA';
const message = 'messageB';
const sleep = async (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};
const destroyTask = async () => {
	let queues = await sqs.list();
	await sqs.destroy(queues[0]);
	queues = await sqs.list();
	console.debug('immediate after deletion', queues);
	const sleepTime = 60000;
	await sleep(sleepTime);
	queues = await sqs.list();
	console.debug(`${sleepTime / 1000} seconds after deletion`, queues);
};
const task = async () => {
	const QueueUrl = await sqs.create(queue);

	await sqs.send(QueueUrl, message);
	const Messages = await sqs.receive(QueueUrl);
	console.debug(Messages);
	await destroyTask();

};
task();



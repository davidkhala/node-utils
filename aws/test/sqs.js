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

	let destroyResult = await sqs.destroy(queues[0]);
	console.debug({destroyResult});
	queues = await sqs.list();
	console.debug('immediate after deletion', queues);
	await sleep(60000);
	queues = await sqs.list();
	console.debug('60 seconds after deletion', queues);
};
task();



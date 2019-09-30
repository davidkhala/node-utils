const {SQS} = require('../sqs');
const region = 'ap-southeast-1';
const sqs = new SQS(region);
const queue = 'topicA';
const task = async () => {
	await sqs.create(queue);
	let queues = await sqs.list();
	console.debug(queues);

	let destroyResult = await sqs.destroy(queues[0]);
	console.debug({destroyResult});
	queues = await sqs.list();
	console.debug(queues);
};
task();



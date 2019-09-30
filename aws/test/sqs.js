const {SQS} = require('../sqs');
const sqs = new SQS();
const queue = 'topicA';
const task = async () => {
	await sqs.create(queue);
};
task();



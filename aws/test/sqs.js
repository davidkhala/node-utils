const {SQS} = require('../sqs');
const region = 'ap-southeast-1';
const sqs = new SQS(region);
const queue = 'topicA';
const task = async () => {
	await sqs.create(queue);
};
task();



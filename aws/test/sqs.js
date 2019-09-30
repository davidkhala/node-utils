const {SQS} = require('../sqs');
const sqs = new SQS();
const region = 'ap-southeast-1';
sqs.updateRegion(region);
const queue = 'topicA';
const task = async () => {
	await sqs.create(queue);
};
task();



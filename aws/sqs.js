const AWS = require('aws-sdk');

class SQS {
	constructor() {
		this.sqs = new AWS.SQS({apiVersion: '2012-11-05'});
	}

	/**
	 *
	 * @param QueueName
	 * @param FifoQueue Designates a queue as FIFO, When you set this attribute, you must also provide the `MessageGroupId` for your messages explicitly.
	 * @return {Promise<SQS.CreateQueueResult & {$response: Response<SQS.CreateQueueResult, AWSError>}>}
	 */
	async create(QueueName, {FifoQueue} = {}) {
		const opts = {
			QueueName,
			Attributes: {}
		};
		if (FifoQueue) {
			opts.Attributes.FifoQueue = !!FifoQueue;
			opts.QueueName = `${QueueName}.fifo`;
		}
		const createResult = await this.sqs.createQueue(opts).promise();
		console.debug(createResult);

		return createResult;
	}

	async getQueueUrl(QueueName) {
		const {QueueUrl} = await this.sqs.getQueueUrl({QueueName}).promise();
		return QueueUrl;
	}

	/**
	 * If you delete a queue, you must wait at least 60 seconds before creating a queue with the same name.
	 * @param topic
	 * @return {Promise<{} & {$response: Response<{}, AWSError>}>}
	 */
	async destroy(topic) {
		const opts = {
			QueueUrl: topic // TODO not QueueName ?
		};

		return await this.sqs.purgeQueue(opts).promise();
	}

	async list() {
		return this.sqs.listQueues().promise();
	}

	async send(topic, message) {
		const opts = {
			MessageBody: message,
			QueueUrl: topic,
			DelaySeconds: 0
		};
		return this.sqs.sendMessage(opts).promise();
	}

	async delete(topic, message, ReceiptHandle) {
		const opts = {
			QueueUrl: topic,
			ReceiptHandle
		};

		return this.sqs.deleteMessage(opts).promise();
	}
}

exports.SQS = SQS;

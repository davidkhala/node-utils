const {AWSClass} = require('./');

class SQS extends AWSClass {
	constructor(region) {
		super();
		this.updateRegion(region);
		this.sqs = new this.AWS.SQS({apiVersion: '2012-11-05'});
	}

	/**
	 *
	 * @param QueueName
	 * @param FifoQueue Designates a queue as FIFO, When you set this attribute, you must also provide the `MessageGroupId` for your messages explicitly.
	 * @return {Promise<String>} QueueUrl
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
		return createResult.QueueUrl;
	}

	async getQueueUrl(QueueName) {
		const {QueueUrl} = await this.sqs.getQueueUrl({QueueName}).promise();
		return QueueUrl;
	}

	/**
	 * If you delete a queue, you must wait at least 60 seconds before creating a queue with the same name.
	 * @param QueueUrl
	 * @return {Promise<{} & {$response: Response<{}, AWSError>}>}
	 */
	async destroy(QueueUrl) {
		const opts = {
			QueueUrl: QueueUrl // NOTE: not QueueName
		};

		return await this.sqs.purgeQueue(opts).promise();
	}

	/**
	 *
	 * @return {Promise<String[]>}
	 */
	async list() {
		const listResult = await this.sqs.listQueues().promise();
		const {QueueUrls}= listResult;
		return QueueUrls;
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

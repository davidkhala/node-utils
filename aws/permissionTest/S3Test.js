const region = 'ap-southeast-1';
const newBucketName = 'mcc-test-S3'.toLowerCase();
const S3 = require('../S3');

const s3 = new S3(region);
const task = async () => {
	let buckets = await s3.listBuckets();
	console.info('list buckets', buckets);
	console.info('endpoint', s3.endpoint);
	await s3.createBucket(newBucketName);
	buckets = await s3.listBuckets();
	console.info('list buckets', buckets);
	await s3.deleteBucket(newBucketName);
	buckets = await s3.listBuckets();
	console.info('list buckets', buckets);
};
task();

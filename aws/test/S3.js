const region = 'ap-southeast-1';
const bucket_name = 'mcc-lgstorage';
const S3 = require('../S3');

const s3 = new S3(region);
const task = async () => {
	const buckets = await s3.listBuckets();
	console.info('list buckets', buckets);
};
task();

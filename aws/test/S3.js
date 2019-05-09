const region = 'ap-southeast-1';
const bucket_name = 'mcc-lgstorage';
const S3 = require('../S3');

const s3 = new S3(region);
const task = async () => {
	await s3.listBuckets();
};
task();

const AWS = require('aws-sdk'); // To set the AWS credentials and region.

const region = 'ap-southeast-1';
AWS.config.update({
	region
});

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const bucket_name = 'mcc-lgstorage';

const create_bucket_params = {
	Bucket: bucket_name,
	CreateBucketConfiguration: {
		LocationConstraint: region
	}
};

const delete_bucket_params = {Bucket: bucket_name};

// List all of your available buckets in this AWS Region.
const listMyBuckets = async () => {
	const resp = await s3.listBuckets().promise();
	console.debug(resp);
};

// Create a bucket in this AWS Region.
function createMyBucket(callback) {
	console.log('\nCreating a bucket named ' + bucket_name + '...\n');

	s3.createBucket(create_bucket_params, function (err, data) {
		if (err) {
			console.log(err.code + ': ' + err.message);
		}

		callback(err);
	});
}

// Delete the bucket you just created.
function deleteMyBucket(callback) {
	console.log('\nDeleting the bucket named ' + bucket_name + '...\n');

	s3.deleteBucket(delete_bucket_params, function (err, data) {
		if (err) {
			console.log(err.code + ': ' + err.message);
		}

		callback(err);
	});
}

// Call the AWS operations in the following order.
const task = async () => {
	await listMyBuckets();
};
task();

// async.series([
// 	listMyBuckets,
// 	createMyBucket,
// 	listMyBuckets,
// 	deleteMyBucket,
// 	listMyBuckets
// ]);
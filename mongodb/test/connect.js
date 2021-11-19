const MongoConnect = require('../index');
describe('sample data', () => {
	const user = 'admin';
	const {password} = process.env;
	const domain = 'free.5afsx.mongodb.net';
	const connect = new MongoConnect(domain, user, password);
	it('sample_airbnb', async () => {
		const dbName = 'sample_airbnb';
		await connect.connect(dbName);
		const collections = await connect.listCollections();
		console.log(collections);
		const namesOnly = await connect.listCollections(true);
		console.log(namesOnly);

	});
	after(async () => {
		await connect.disconnect();
	});
});
const Autonomous = require('../autonomous');
describe('autonomous', function () {
	this.timeout(0);
	const {password} = process.env;
	const domain = 'UKYLLMQVBNKWZDY-FREEJSON.adb.ap-seoul-1.oraclecloudapps.com';

	const connect = new Autonomous({domain, password});

	it('touch', async () => {
		await connect.connect();

	});
	after(async () => {
		await connect.disconnect();
	});
});

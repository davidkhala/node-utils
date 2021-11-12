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
	after(() => {
		connect.disconnect();
	});
});
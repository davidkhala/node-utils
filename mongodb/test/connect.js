const MongoConnect = require('../index');
const {as} = require('../collection');
const assert = require('assert');
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
		assert.ok(Array.isArray(namesOnly));
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

	before(async () => {
		await connect.connect();
	});

	it('listCollections', async () => {

		const namesOnly = await connect.listCollections(true);
		assert.ok(Array.isArray(namesOnly));
		console.debug(namesOnly);
	});

	it('create Collections', async () => {
		const collectionName = 'foo';
		const collectionHandler = await connect.createCollection(collectionName);

		const wrapper = as(collectionHandler);
		const result = await wrapper.insertOne({hello: 'world'});
		console.debug(result);
		const list = await wrapper.list();
		console.debug(list);
		// 619c3c38fede73d959c75a18
	});

	it('getCollection', async () => {
		const collectionName = 'abc';
		const collection = await connect.getCollection(collectionName);
		assert.strictEqual(collection, undefined);

	});
	it('drop Collections', async () => {
		const collectionName = 'foo';
		const result = await connect.dropCollection(collectionName, true);
		console.debug(result);

	});
	it('drop database', async () => {
		const result = await connect.dropDatabase();
		console.debug(result);
	});
	after(async () => {
		await connect.disconnect();
	});
});


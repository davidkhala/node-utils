const logger = require('khala-logger/log4js').consoleLogger('test:SQL');
const assert = require('assert');
describe('smoke test', () => {

	const MySQL = require('../Mysql');
	const DB_NAME = 'database';
	let mysql;
	beforeEach(() => {
		mysql = require('./_connection').mysql;

	});
	afterEach(async () => {
		await mysql.close();
	});
	it('connect', async () => {
		await mysql.connect('database', true);
		const pong = await mysql.ping();
		assert.ok(pong);
	});
	it('connect with silence', async () => {
		const {setup} = require('./_connection');
		await mysql.connect(DB_NAME, true);
		const models = await setup(mysql);
		const user = models.User;
		const rows = await MySQL.ORM.list(user);
		logger.info(rows);
	});
});

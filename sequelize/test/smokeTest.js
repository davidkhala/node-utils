const logger = require('khala-logger/log4js').consoleLogger('test:SQL');
describe('smoke test', () => {

	const MySQL = require('../Mysql');
	let mysql;
	beforeEach(() => {
		mysql = require('./_connection').mysql;

	});
	afterEach(async () => {
		await mysql.close();
	});
	it('connect', async () => {
		await mysql.connect();
	});
	it('connect with silence', async () => {
		const {setup} = require('./_connection');
		await mysql.connect(true);
		const models = await setup(mysql);
		const user = models.User;
		const rows = await MySQL.ORM.list(user);
		logger.info(rows);
	});
});

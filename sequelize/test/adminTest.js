const logger = require('khala-logger/log4js').consoleLogger('test:SQL');

describe('SQL admin test', async () => {
	const {mysql, setup} = require('./_connection');
	const DB_NAME = 'database';
	beforeEach(async () => {
		await mysql.connect(DB_NAME, true);
		await setup(mysql);
	});
	afterEach(async () => {
		await mysql.close();
	});
	const showAllTables = async () => {
		const result = await mysql.showAllSchemas();
		logger.info(result);
	};
	it('showAllTables', async () => {
		await showAllTables();
	});
	it('dropTable', async () => {
		await mysql.dropSchema('User');
		await showAllTables();
	});
	it('dropAllTableTest', async () => {
		await mysql.dropAllTables();
		await showAllTables();
	});
	it('dropDatabase', async () => {
		await mysql.dropDatabase('database');
	});

});


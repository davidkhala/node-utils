const LevelDB = require('..');

const path = require('path');
const logger = require('khala-logger/log4js').consoleLogger('test:leveldb');

describe('Leveldb reader', () => {

	it('histroy', async () => {
		const histroy = path.resolve(__dirname, 'fixtures/ledgersData/historyLeveldb');
		const levelconn = new LevelDB(histroy);
		await levelconn.connect();
		const aValue = await levelconn.list();
		logger.info(aValue);
	});
	it('index', async () => {
		const index = path.resolve(__dirname, 'fixtures/ledgersData/chains/index');
		const levelconn = new LevelDB(index);
		await levelconn.connect();
		const aValue = await levelconn.list();
		logger.info(aValue);
	});

});

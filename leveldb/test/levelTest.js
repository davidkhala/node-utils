const LevelDB = require('..');

const path = require('path');
const logger = require('khala-logger/log4js').consoleLogger('test:leveldb');

describe('Leveldb reader', () => {
	it('transientStore', async () => {
		const transientStore = path.resolve(__dirname, 'artifacts/transientStore');
		const levelconn = new LevelDB(transientStore);
		await levelconn.connect();
	});
	it('histroy', async () => {
		const histroy = path.resolve(__dirname, 'artifacts/ledgersData/historyLeveldb');
		const levelconn = new LevelDB(histroy);
		await levelconn.connect();
	});
	it('index', async () => {
		const index = path.resolve(__dirname, 'artifacts/ledgersData/chains/index');
		const levelconn = new LevelDB(index);
		await levelconn.connect();
		const aValue = await levelconn.list();
		logger.info(aValue);
	});

});

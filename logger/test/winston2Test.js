const Winston2 = require('../winston');
describe('Winston2:Console', () => {
	const label = 'test';
	const logger = Winston2.new(label);
	it('debug', () => {
		logger.debug('abc');
	});
	it('info', () => {
		const obj = {a: 'vb'};
		logger.info('abc', obj);
	});
	it('date format', () => {

		const dateLogger = Winston2.new('date local', undefined, Winston2.localDateCallback);
		dateLogger.info('abc');
	});
});
describe('Winston2:File', () => {

	const fsExtra = require('fs-extra');
	const file1 = 'test.Log';
	const file2 = 'test2.log';
	const fileLogger = Winston2.newFile('test:file', file1);
	it('error', () => {
		const obj = {a: 'vb'};
		const array = [1, 3, 4, 2];
		fileLogger.error('abc', 'cde', obj, array);
	});
	it('no logger pollution', () => {
		const logger2 = Winston2.newFile('test:file', file2);
		fileLogger.info('it should show up in ', file1);
		logger2.info('it should show up in ', file2);
	});
	it('use date formatter', () => {
		const logger = Winston2.newFile('test:file', file1, undefined, Winston2.localDateCallback);
		logger.info('abc');
	});

	after(() => {
		fsExtra.removeSync(file1);
		fsExtra.removeSync(file2);
	});
});




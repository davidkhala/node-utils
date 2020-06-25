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
});
describe('Winston2:File', () => {

	const filePath = 'test.Log';
	const fileLogger = Winston2.newFile('test:file', filePath);
	it('error', () => {
		const obj = {a: 'vb'};
		const array = [1, 3, 4, 2];
		fileLogger.error('abc', 'cde', obj, array);
	});
	after(() => {
		const fs = require('fs');
		fs.unlinkSync(filePath);
	});
});




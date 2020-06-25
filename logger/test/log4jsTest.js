const {consoleLogger, fileLogger} = require('../log4js');
describe('Log4js:consoleLogger', () => {
	const logger = consoleLogger('a');
	it('debug', () => {
		logger.debug('debug');
	});
	it('info', () => {
		logger.info('a');
	});
});
describe('Log4js:fileLogger', () => {
	const fsExtra = require('fs-extra');
	const file = 'test.log';
	it('info', () => {
		const fileLog = fileLogger('fl', file);
		fileLog.info('debug file');
	});
	it('level higher than DEBUG', () => {
		const fileLog2 = fileLogger('fl', file, 2);
		fileLog2.debug('this should be hidden');
	});
	after(() => {
		fsExtra.removeSync(file);
	});
});




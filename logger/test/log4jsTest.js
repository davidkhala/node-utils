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
	const fs = require('fs');
	it('info', () => {
		const file = 'test.log';
		const fileLog = fileLogger('fl', file);
		fileLog.info('debug file');
		fs.unlinkSync(file);
	});
	it('level higher than DEBUG', () => {
		const file = 'test.log';
		const fileLog2 = fileLogger('fl', file, 2);
		fileLog2.debug('this should be hidden');
		fs.unlinkSync(file);
	});
});




const Logger = require('simple-node-logger');
const opts = {
	timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
};

describe('simple-node-logger:console', () => {

	it('demo', () => {
		const logger = Logger.createSimpleLogger();
		logger.debug('debug');
		logger.info('info');
	});

});
describe('simple-node-logger:file', () => {
	it('demo', () => {
		opts.logFilePath = 'test.log';
		const logger = Logger.createSimpleLogger(opts);
		logger.debug('debug');
		logger.info('info');

	});
});
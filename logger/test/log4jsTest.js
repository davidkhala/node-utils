import {consoleLogger} from '../log4.js';
describe('Log4js:consoleLogger', () => {
	const logger = consoleLogger('a');
	it('debug', () => {
		logger.debug('debug');
	});
	it('info', () => {
		logger.info('a');
	});
});





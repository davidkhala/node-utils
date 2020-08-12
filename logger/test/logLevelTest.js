const log = require('loglevel');
describe('logLevel', () => {
	it('demo', () => {
		log.trace('trace');
		log.debug('debug');
		log.log('log');
		log.info('info');
		log.warn('warn');
		log.error('error');
	});
});

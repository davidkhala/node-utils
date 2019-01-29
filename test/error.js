const logger = require('../').devLogger('test:error');
try {
	throw Error('abc');
} catch (err) {
	logger.debug(err);
	logger.debug('err.code', err.code);
	logger.debug('err.message', err.message);
	logger.debug('err.stack', err.stack);
	logger.error(err.toString());
}
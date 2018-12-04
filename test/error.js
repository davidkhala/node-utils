const Log4j = require('log4js');
const logger = Log4j.getLogger('test');
logger.level = 'debug';
try {
	throw Error('abc');
} catch (err) {
	logger.debug(err);
	logger.debug('err.code', err.code);
	logger.debug('err.message', err.message);
	logger.debug('err.stack', err.stack);
	logger.error(err.toString());
}
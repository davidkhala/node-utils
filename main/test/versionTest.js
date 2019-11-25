const {nextVersion, validVersion, newerVersion} = require('../version');
const logger = require('khala-logger/dev').devLogger('test:version');

logger.debug(!!validVersion('0.0.0'));

logger.debug(nextVersion('0.0.0', 'major'));
logger.debug(nextVersion('0.0.0', 'minor'));
logger.debug(nextVersion('0.0.0', 'patch'));

logger.debug(newerVersion('1.0.0', '0.1.3'));
logger.debug(newerVersion('0.0.0', '0.1.3'));
logger.debug(newerVersion('0.2.0', '0.1.3'));
logger.debug(newerVersion('0.0.3', '0.0.2'));
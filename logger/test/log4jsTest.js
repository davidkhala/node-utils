const {consoleLogger, fileLogger} = require('../log4js');
const logger = consoleLogger('a');
logger.debug('debug');
logger.info('a');
const fileLog = fileLogger('fl', 'test.log');
fileLog.info('debug file');
const fileLog2 = fileLogger('fl', 'test.log', 2);
fileLog2.debug('this should be hidden');

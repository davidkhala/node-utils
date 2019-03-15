const {int2Chars, dateFormat, chars2Hex, isPath} = require('../format');
const charSpace = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const logger = require('../.').devLogger('test:format');
const dateString = dateFormat('yyyyMMdd', new Date());
logger.info(dateString, 'should be in format of', '20181025');

logger.info(int2Chars(1, charSpace));
logger.info(int2Chars(2, charSpace));

logger.info(int2Chars(50, charSpace));
logger.info(int2Chars(51, charSpace));

logger.info('chars2Hex', chars2Hex('=!f'));
logger.info('isPath', isPath(''));
logger.info('isPath', isPath());
logger.info('isPath', isPath(null));

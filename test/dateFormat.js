const {dateFormat} = require('../helper');
const logger = require('../logger').new('test:dateFormat');
const dateString = dateFormat('yyyyMMdd', new Date());
logger.info(dateString);
// 20181025
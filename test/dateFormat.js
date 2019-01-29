const {dateFormat} = require('../helper');
const logger = require('../').devLogger('test:dateFormat');
const dateString = dateFormat('yyyyMMdd', new Date());
logger.info(dateString);
// 20181025
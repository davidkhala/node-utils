const Logger = require('../');
const label = 'test';
const logger = Logger.new(label);
const path = require('path');
const filePath = path.resolve('test.Log');
const fileLogger = Logger.newFile('test:file', filePath);
logger.debug('abc');
fileLogger.error('abc', 'cde');
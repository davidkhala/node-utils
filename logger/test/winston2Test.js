const Winston2 = require('../winston');
const label = 'test';
const logger = Winston2.new(label);
const path = require('path');
const filePath = path.resolve('test.Log');
const fileLogger = Winston2.newFile('test:file', filePath);
logger.debug('abc');
const obj = {a: 'vb'};
const array = [1, 3, 4, 2];
logger.info('abc', obj);
fileLogger.error('abc', 'cde', obj, array);
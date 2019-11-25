const {randomHex, randomString, randomChars} = require('../random');
const logger = require('khala-logger/dev').devLogger('test:random');
const hex = randomHex(20);
logger.debug(hex);
const randStr = randomString(16);
logger.debug('randomString', randStr);
const numberSet = '0123456789';
logger.debug('random any charset', randomChars(5, numberSet));

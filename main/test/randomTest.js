const {randomHex, randomString, random} = require('../random');
const logger = require('../.').devLogger('test:random');
const hex = randomHex(20);
logger.debug(hex);
const randStr = randomString(16);
logger.debug('randomString', randStr);
const numberSet = '0123456789';
logger.debug('random any charset', random(5, numberSet));

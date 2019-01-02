const {randomHex, randomString} = require('../random');
const logger = require('../logger').new('test:random');
const hex = randomHex(20);
logger.debug(hex);
const randStr = randomString(16);
logger.debug(randStr);

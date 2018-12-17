const {randomHex} = require('../random');
const logger = require('../logger').new('test:random');
const hex = randomHex(20);
logger.debug(hex);

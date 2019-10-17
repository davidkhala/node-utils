const {new: newLogger} = require('../');
const logger = newLogger('b');
logger.debug({a: {a: 'b'}});
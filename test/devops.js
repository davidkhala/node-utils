const logger = require('./testUtils').devLogger('devops');
const devOps = require('../devOps');
logger.info({tempdir: devOps.tempdir});

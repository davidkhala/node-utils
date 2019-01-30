const logger = require('../.').devLogger('devops');
const devOps = require('../devOps');
logger.info({tempdir: devOps.tempdir});

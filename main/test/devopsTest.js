const logger = require('../.').devLogger('devops');
const devops = require('../devOps');
logger.info({tempdir: devops.tempdir});

const yaml = require('../../yaml');
const logger = require('../../.').devLogger('test:yaml');
const path = require('path');
const readFile = path.resolve(__dirname, 'read.yaml');
const writtenFile = path.resolve(__dirname, 'write.yaml');
const readResult = yaml.read(readFile);
logger.debug(readResult);

delete readResult.anchorPeers.Application.Organizations;
yaml.write(readResult, writtenFile);
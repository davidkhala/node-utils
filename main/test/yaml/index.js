const yaml = require('../../yaml');
const logger = require('khala-logger/log4js').consoleLogger('test:yaml');
const path = require('path');
const readFile = path.resolve(__dirname, 'read.yaml');
const writtenFile = path.resolve(__dirname, 'write.yaml');
describe('yaml', () => {
	it('read', () => {
		const readResult = yaml.read(readFile);
		logger.debug(readResult);
	});
	it('write', () => {
		const readResult = yaml.read(readFile);
		delete readResult.anchorPeers.Application.Organizations;
		yaml.write(readResult, writtenFile);
	});
});

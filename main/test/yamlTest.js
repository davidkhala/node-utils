const yamlTest = require('../yaml');
const logger = require('khala-logger/log4js').consoleLogger('test:yaml');
const path = require('path');
const readFile = path.resolve(__dirname, 'fixtures', 'read.yaml');
const writtenFile = path.resolve(__dirname, 'fixtures', 'write.yaml');
describe('yaml', () => {
	it('read', () => {
		const readResult = yamlTest.read(readFile);
		logger.debug(readResult);
	});
	it('write', () => {
		const readResult = yamlTest.read(readFile);
		delete readResult.anchorPeers.Application.Organizations;
		yamlTest.write(readResult, writtenFile);
	});
});

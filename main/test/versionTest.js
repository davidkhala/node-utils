const {nextVersion, validVersion, newerVersion} = require('../version');
const logger = require('khala-logger/log4js').consoleLogger('test:version');
const assert = require('assert');
describe('test:version', () => {
	it('validVersion', () => {
		assert.ok(validVersion('0.0.0'));
	});
	it('nextVersion', () => {
		logger.debug(nextVersion('0.0.0', 'major'));
		logger.debug(nextVersion('0.0.0', 'minor'));
		logger.debug(nextVersion('0.0.0', 'patch'));
	});
	it('newerVersion', () => {
		logger.debug(newerVersion('1.0.0', '0.1.3'));
		logger.debug(newerVersion('0.0.0', '0.1.3'));
		logger.debug(newerVersion('0.2.0', '0.1.3'));
		logger.debug(newerVersion('0.0.3', '0.0.2'));
	});
});

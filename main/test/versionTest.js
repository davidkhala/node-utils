import {nextVersion, validVersion, newerVersion} from '../version.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';
import assert from 'assert';

const logger = consoleLogger('test:version');
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

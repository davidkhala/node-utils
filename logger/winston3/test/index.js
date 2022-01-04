import {consoleLogger} from '../index.js';
import {configuredFormatter} from 'winston-json-formatter';
describe('Winston3: console', () => {

	it('smoke', () => {
		const logger = consoleLogger('b');
		logger.debug({a: {a: 'b'}});
	});

});

describe('Winston3 with `winston-json-formatter`', () => {
	it('console format', () => {
		const logger = consoleLogger('b');
		const options = {
			typeFormat: 'console',
			service: 'service name',
			version: 'version name'
		};
		logger.format = configuredFormatter(options); // overwriting
		logger.info('string');
		logger.info({json: 'json'}); // No logger label support
	});
	it('json format', () => {
		const logger = consoleLogger('b');
		const options = {
			typeFormat: 'json',
		};
		logger.format = configuredFormatter(options); // overwriting
		logger.info('string');
		logger.info({json: 'json'}); // No logger label support
	});

});



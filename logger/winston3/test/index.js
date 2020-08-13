const {new: newLogger} = require('../');
describe('Winston3: console', () => {

	it('smoke', () => {
		const logger = newLogger('b');
		logger.debug({a: {a: 'b'}});
	});
	it('with `winston-json-formatter`', () => {
		const logger = newLogger('b');
		const {configuredFormatter} = require('winston-json-formatter');
		const options = {
			typeFormat: 'console',
			service: 'service name',
			version: 'version name'
		};
		logger.format = configuredFormatter(options); // overwriting
		logger.info('string');
		logger.info({json: 'json'}); // No logger label support

	});
});



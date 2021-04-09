const helper = require('../helper');
const logger = require('khala-logger/log4js').consoleLogger('test:helper');
const path = require('path');

describe('test:helper', () => {
	it('pathTest', () => {
		const relPath = helper.homeResolve('abc');
		logger.debug(relPath);

		logger.debug(path.resolve('~'));
	});
	it('arrayEvenTest', () => {
		logger.debug(helper.isArrayEven());
		logger.debug(helper.isArrayEven([]));
		logger.debug(helper.isArrayEven([1]));
	});
});


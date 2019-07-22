const helper = require('../helper');
const logger = require('../.').devLogger('test:helper');
const path = require('path');

const pathTest = () => {
	const relPath = helper.homeResolve('abc');
	logger.debug(relPath);

	logger.debug(path.resolve('~'));
};
const arrayEvenTest = () => {
	logger.debug(helper.isArrayEven());
	logger.debug(helper.isArrayEven([]));
	logger.debug(helper.isArrayEven([1]));
};
pathTest();
arrayEvenTest();

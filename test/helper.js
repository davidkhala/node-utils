const helper = require('../helper');
const logger = require('./testUtils').devLogger('test:helper');
const path = require('path');
const execTest = async () => {
	const requirePermission = 'apt update';
	try {
		await helper.exec(requirePermission);
	} catch (e) {
		logger.info('assertFail success', requirePermission);
	}

	await helper.exec('sudo apt update');//Test passed: sudo have interactive input
};
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
execTest();
pathTest();
arrayEvenTest();
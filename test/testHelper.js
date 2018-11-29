const helper = require('../helper');
const logger = require('../logger').new('test:helper');

const execTest = async () => {
	const requirePermission = 'apt update';
	try {
		await helper.exec(requirePermission);
	} catch (e) {
		logger.info('assertFail success', requirePermission);
	}

	await helper.exec('sudo apt update');//Test passed: sudo have interactive input
};
execTest();
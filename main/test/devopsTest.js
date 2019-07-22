const logger = require('../.').devLogger('devops');
const devOps = require('../devOps');
logger.info({tempdir: devOps.tempdir});

const killProcess = async (port) => {
	const isInUse = await devOps.isPortInUse(port);
	console.log({port, isInUse});
	if (isInUse) {
		const gotProcess = await devOps.findProcess('port', port, false);
		const {pid} = gotProcess[0];
		await devOps.killProcess(pid);
	}

};

const execTest = async () => {
	const requirePermission = 'apt update';
	try {
		await devOps.exec(requirePermission);
	} catch (e) {
		logger.info('assertFail success', requirePermission);
	}

	await devOps.exec('sudo apt update');//Test passed: sudo have interactive input
};
const task = async () => {
	await killProcess(7059);
};
task();

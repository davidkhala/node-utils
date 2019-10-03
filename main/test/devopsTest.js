const logger = require('../.').devLogger('devops');
const devOps = require('../devOps');


const killProcess = async port => {
	const isInUse = await devOps.isPortInUse(port);
	console.log({port, isInUse});
	if (isInUse) {
		const gotProcess = await devOps.findProcess('port', port, false);
		const {pid} = gotProcess[0];
		await devOps.killProcess(pid);
	}
};
const execDetachTest = async () => {
	const cmd = '/home/davidliu/Documents/delphi-fabric/common/bin/configtxlator start --hostname=0.0.0.0 --port=7059 --CORS=*';
	await devOps.execDetach(cmd);
};

const execTest = async () => {
	const requirePermission = 'apt update';
	try {
		await devOps.exec(requirePermission);
	} catch (e) {
		logger.info('assertFail success', requirePermission);
	}

	await devOps.exec('sudo apt update'); // Test passed: sudo have interactive input
};
const taskConfigtxlator = async () => {
	await killProcess(7059);
	await execDetachTest();
};
const task = async () => {
	logger.info({tempdir: devOps.tempdir});
	await execTest();
};
task();

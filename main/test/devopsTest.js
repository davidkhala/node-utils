const logger = require('../.').devLogger('devops');
const devops = require('../devOps');
logger.info({tempdir: devops.tempdir});

const task = async () => {
	const port = 7059;
	const isInUse = await devops.isPortInUse(port);
	console.log({port, isInUse});
	if (isInUse) {
		const gotProcess = await devops.findProcess('port', 7059, false);
		const {pid} = gotProcess[0];
		await devops.killProcess(pid);
	}

};
task();

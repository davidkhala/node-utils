const logger = require('khala-logger/log4js').consoleLogger('devops');
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
describe('devOps', function () {

	this.timeout(999999);
	it.skip('restart Configtxlator', async () => {
		const port = 7059;

		await killProcess(port);
		const cmd = '/home/davidliu/Documents/delphi-fabric/common/bin/configtxlator start --hostname=0.0.0.0 --port=7059 --CORS=*';
		devOps.execDetach(cmd);
	});
	it.skip('exec: apt update', async () => {
		const requirePermission = 'apt update';
		try {
			await devOps.exec(requirePermission);
		} catch (e) {
			logger.info('assertFail success', requirePermission);
		}

		await devOps.exec('sudo apt update'); // Test passed: sudo have interactive input
	});
	it('execStream: npm i', async () => {
		devOps.execStream('npm install');
	});
	it.skip('os', async () => {
		logger.info({tempdir: devOps.tempdir});
	});
});


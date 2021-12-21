const logger = require('khala-logger/log4js').consoleLogger('devops');
const devOps = require('../devOps');

describe('devOps', function () {

	this.timeout(0);
	it('exec: apt update', () => {
		if (process.env.CI) {
			// skip this check
			return;
		}

		const requirePermission = 'apt update';
		try {
			devOps.execSync(requirePermission);
		} catch (e) {
			logger.info('assertFail success', requirePermission);
		}

		devOps.execSync('sudo apt update'); // Test passed: sudo have interactive input
	});
	it('find process', async () => {
		const result = await devOps.findProcess({port: 3443});
		const [pid] = result;
		if (pid) {
			devOps.killProcess(pid);
		}

	});
	it('execStream: npm i', async () => {
		devOps.execStream('npm install');
	});
	it('os', async () => {
		logger.info({tempdir: devOps.tempdir});
		logger.info(devOps.hostname());

	});
});


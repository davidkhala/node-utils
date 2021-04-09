const logger = require('khala-logger/log4js').consoleLogger('devops');
const devOps = require('../devOps');

describe('devOps', function () {

	this.timeout(999999);
	it.skip('exec: apt update', async () => {
		const requirePermission = 'apt update';
		try {
			await devOps.execSync(requirePermission);
		} catch (e) {
			logger.info('assertFail success', requirePermission);
		}

		await devOps.execSync('sudo apt update'); // Test passed: sudo have interactive input
	});
	it('execStream: npm i', async () => {
		devOps.execStream('npm install');
	});
	it('os', async () => {
		logger.info({tempdir: devOps.tempdir});
	});
});


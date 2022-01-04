import {consoleLogger} from '@davidkhala/logger/log4.js';
import assert from 'assert';

import {execStream, hostname, ip, tempdir, execSync, os} from '../devOps.js';
const logger = consoleLogger('devops');

describe('devOps', function () {

	this.timeout(0);
	it('exec: apt update', () => {
		if (process.env.CI) {
			// skip this check
			return;
		}

		execSync('sudo apt update');
		// Test passed: sudo have interactive input
		// Test failed: on Oracle Linux 8
	});
	it('execStream: npm i', async () => {
		execStream('npm install');
	});
	it('os', async () => {
		logger.info({tempdir});
		logger.info({hostname});
		const address = ip(true);
		assert.ok(Array.isArray(address));
	});
});


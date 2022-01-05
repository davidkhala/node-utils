import {consoleLogger} from '@davidkhala/logger/log4.js';
import {findProcess} from '../devOps.js';
import {killProcess} from '@davidkhala/light/devOps.js';

const logger = consoleLogger('devops');

describe('devOps', function () {

	this.timeout(0);
	it('find process', async () => {
		const result = await findProcess({port: 3443});
		const [pid] = result;
		if (pid) {
			killProcess(pid);
		}

	});

});


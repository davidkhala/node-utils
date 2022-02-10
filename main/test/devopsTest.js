import {findProcess} from '../devOps.js';
import {killProcess} from '@davidkhala/light/devOps.js';


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


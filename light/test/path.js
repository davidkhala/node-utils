import {homeResolve} from '../path.js';
import path from 'node:path';

describe('pathTest', () => {
	it('homeResolve', () => {
		const relPath = homeResolve('abc');
		console.debug(relPath);
		console.debug(path.resolve('~'));
	});

});


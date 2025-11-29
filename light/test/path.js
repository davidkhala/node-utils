import {homeResolve} from '../path.js';
import path from 'path';

describe('pathTest', () => {
	it('homeResolve', () => {
		const relPath = homeResolve('abc');
		console.debug(relPath);
		console.debug(path.resolve('~'));
	});

});


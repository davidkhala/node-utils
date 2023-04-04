import {listDir} from '../fs.js';
import path from 'path';
import {filedirname} from '@davidkhala/light/es6.mjs';

filedirname(import.meta);
describe('fs', () => {
	it('list dir', () => {
		const dir = path.resolve(__dirname);

		const result = listDir(dir, undefined, true);
		console.debug(result)
	});

});

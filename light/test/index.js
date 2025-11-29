import assert from 'assert';
import path from 'path';

import {filedirname, importFrom} from '../es6.mjs';
import {isPath} from '../path.js';

filedirname(import.meta);

describe('index Test', () => {


	it('__dirname', () => {

		const pathTokens = __dirname.split(path.sep);
		assert.ok(pathTokens.includes('node-utils') && pathTokens.includes('light'));
	});

	it('test isPath', () => {
		assert.ok(!isPath(''));
		assert.ok(!isPath());
		assert.ok(!isPath(null));
		assert.ok(isPath('/tmp/date.tmp'));
		assert.ok(isPath('/tmp/'));
		assert.ok(!isPath('date.tmp'));

	});
	it('json from', () => {
		const {a} = importFrom(import.meta, './test.json',);
		assert.strictEqual(a, 1);
	});
});

import {URL} from 'url';
import path from 'path';
import fs from 'fs';
import {filedirname} from '../es6.mjs'
import assert from 'assert';
import {isDirectory} from '../index.js';

describe('', function (){
	it('windows test', () => {
		filedirname(import.meta)
		assert.ok(fs.existsSync(__filename), `${__filename} is not a directory`)
		assert.ok(isDirectory(__dirname), `${__dirname} is not a directory`)

	});
	it('isDir', () => {
		assert.ok(isDirectory(__dirname));
		const notExist = path.resolve(__dirname, 'abc');
		assert.ok(!isDirectory(notExist));
		const aFile = path.resolve(__dirname, 'randomTest.js');

		assert.ok(!isDirectory(aFile) && fs.existsSync(aFile));
	});
})

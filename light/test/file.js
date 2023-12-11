import assert from 'assert';
import path from 'path';
import fs from 'fs';
import {File, isDirectory, read} from '../file.js';
import {filedirname, importFrom, resolve} from '../es6.mjs';

describe('es6.js', () => {
	it('windows test', () => {
		filedirname(import.meta);
		assert.ok(fs.existsSync(__filename), `${__filename} should not be a directory`);
		assert.ok(isDirectory(__dirname), `${__dirname} should be a directory`);

	});
	it('require json', () => {
		const jsonOut = importFrom(import.meta, './test.json')
		assert.deepEqual(jsonOut, {a:1})
	});
	it('grep', () => {
		const content = read(resolve(import.meta, './test.json'));
		const file = new File(content);
		const {line, content: _content} = file.grep('a', true)[0];
		assert.strictEqual(line, 1);
		assert.strictEqual(_content, '  "a": 1');
		assert.strictEqual(file.grep('a')[0], '  "a": 1');
	});
	it('isDir', () => {
		filedirname(import.meta);
		assert.ok(isDirectory(__dirname));
		const notExist = path.resolve(__dirname, 'abc');
		assert.ok(!isDirectory(notExist));
		const aFile = path.resolve(__dirname, 'randomTest.js');

		assert.ok(!isDirectory(aFile) && fs.existsSync(aFile));
	});
});

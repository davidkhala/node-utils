import {isDirectory} from '../index.js';

import assert from 'assert';
import fs from 'fs';
import {URL} from 'url';
import path from 'path';

describe('index Test', () => {

	const __dirname = new URL('.', import.meta.url).pathname;
	it('isDir', () => {
		assert.ok(isDirectory(__dirname));
		const notExist = path.resolve(__dirname, 'abc');
		assert.ok(!isDirectory(notExist));
		const aFile = path.resolve(__dirname, 'randomTest.js');

		assert.ok(!isDirectory(aFile) && fs.existsSync(aFile));
	});
});
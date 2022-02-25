import {isDirectory, isPath} from '../index.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';

import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {filedirname, importFrom} from '../es6.mjs';

filedirname(import.meta);
const logger = consoleLogger('light');
describe('index Test', () => {


	it('__dirname', () => {

		const pathTokens = __dirname.split(path.sep);
		assert.ok(pathTokens.includes('node-utils') && pathTokens.includes('light'));
	});


	it('isDir', () => {
		assert.ok(isDirectory(__dirname));
		const notExist = path.resolve(__dirname, 'abc');
		assert.ok(!isDirectory(notExist));
		const aFile = path.resolve(__dirname, 'randomTest.js');

		assert.ok(!isDirectory(aFile) && fs.existsSync(aFile));
	});

	it('test isPath', () => {
		logger.info('isPath', isPath(''));
		logger.info('isPath', isPath());
		logger.info('isPath', isPath(null));
	});
	it('json from', () => {
		const {a} = importFrom('./test.json', import.meta);
		assert.strictEqual(a, 1);
	});
});
import {isDirectory, isArrayEven} from '../index.js';
import assert from 'assert';
import fs from 'fs';
import path from 'path';
import {filedirname} from '../es6.mjs';

describe('index Test', () => {


	before(()=>{
		filedirname(import.meta);
	})
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
	it('arrayEvenTest', () => {
		logger.debug(isArrayEven());
		logger.debug(isArrayEven([]));
		logger.debug(isArrayEven([1]));
	});
});
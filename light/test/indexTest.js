import {isPath} from '../fs.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';

import assert from 'assert';
import path from 'path';
import {filedirname, importFrom} from '../es6.mjs';

filedirname(import.meta);
const logger = consoleLogger('light');
describe('index Test', () => {


	it('__dirname', () => {

		const pathTokens = __dirname.split(path.sep);
		assert.ok(pathTokens.includes('node-utils') && pathTokens.includes('light'));
	});

	it('test isPath', () => {
		logger.info('isPath', isPath(''));
		logger.info('isPath', isPath());
		logger.info('isPath', isPath(null));
	});
	it('json from', () => {
		const {a} = importFrom(import.meta, './test.json', );
		assert.strictEqual(a, 1);
	});
});

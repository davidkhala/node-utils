import {homeResolve} from '../helper.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';
import path from 'path';

const logger = consoleLogger('test:helper');

describe('test:helper', () => {
	it('pathTest', () => {
		const relPath = homeResolve('abc');
		logger.debug(relPath);

		logger.debug(path.resolve('~'));
	});

});


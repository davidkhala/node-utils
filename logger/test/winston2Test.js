import {consoleLogger, localDateCallback, fileLogger} from '../winston.js';
import fsExtra from 'fs-extra';
describe('Winston2:Console', () => {
	const label = 'test';
	const logger = consoleLogger(label);
	it('debug', () => {
		logger.debug('abc');
	});
	it('info', () => {
		const obj = {a: 'vb'};
		logger.info('abc', obj);
	});
	it('date format', () => {

		const dateLogger = consoleLogger('date local', undefined, localDateCallback);
		dateLogger.info('abc');
	});
});
describe('Winston2:File', () => {


	const file1 = 'test.Log';
	const file2 = 'test2.log';
	const logger = fileLogger('test:file', file1);
	it('error', () => {
		const obj = {a: 'vb'};
		const array = [1, 3, 4, 2];
		logger.error('abc', 'cde', obj, array);
	});
	it('no logger pollution', () => {
		const logger2 = fileLogger('test:file', file2);
		logger.info('it should show up in ', file1);
		logger2.info('it should show up in ', file2);
	});
	it('use date formatter', () => {
		const logger3 = fileLogger('test:file', file1, undefined, localDateCallback);
		logger3.info('abc');
	});

	after(() => {
		fsExtra.removeSync(file1);
		fsExtra.removeSync(file2);
	});
});




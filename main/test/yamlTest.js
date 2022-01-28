import {read, write} from '../yaml.js';
import path from 'path';
import {consoleLogger} from '@davidkhala/logger/log4.js';
import {filedirname} from '@davidkhala/light/es6.mjs';


const logger = consoleLogger('test:yaml');
filedirname(import.meta);
describe('yaml', () => {
	let readFile, writtenFile
	before(()=>{

		readFile = path.resolve(__dirname, 'fixtures', 'read.yaml');
		writtenFile = path.resolve(__dirname, 'fixtures', 'write.yaml');
	})
	it('read', () => {
		const readResult = read(readFile);
		logger.debug(readResult);
	});
	it('write', () => {
		const readResult = read(readFile);
		delete readResult.anchorPeers.Application.Organizations;
		write(readResult, writtenFile);
	});
});

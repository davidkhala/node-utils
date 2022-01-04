import {randomHex, randomString, randomChars} from '../random.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';
const logger = consoleLogger('test:random');
describe('test:random', () => {
	it('randomHex', () => {
		const hex = randomHex(20);
		logger.debug(hex);
	});
	it('randomString', () => {
		const randStr = randomString(16);
		logger.debug('randomString', randStr);
	});
	it('randomChars', () => {
		const numberSet = '0123456789';
		logger.debug('random any charset', randomChars(5, numberSet));
	});
});




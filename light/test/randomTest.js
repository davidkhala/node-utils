import {randomHex, randomString, randomChars, randomKeyOf} from '../random.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';
import assert from 'assert';

const logger = consoleLogger('test:random');


describe('test:random', () => {

	it('randomKeyOf', () => {
		const key = randomKeyOf({
			a: 'B',
			c: 'D'
		});
		assert.ok(['a', 'c'].includes(key));
	});
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




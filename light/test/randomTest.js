const {randomHex, randomString, randomChars} = require('../random');
const logger = require('khala-logger/log4js').consoleLogger('test:random');
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




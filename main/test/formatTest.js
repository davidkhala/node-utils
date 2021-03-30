const {int2Chars, dateFormat, chars2Hex, isPath, RegxMatch, isFloat, bytes2String, base64} = require('../format');
const charSpace = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const logger = require('khala-logger/log4js').consoleLogger('test:format');
const assert = require('assert');
describe('format test', () => {
	it('test RegX', () => {
		const testReg = (str) => {
			const pattern = /[*|,":<>[\]{}`';()@&$#%]/;
			const flags = 'i';// m|i|g
			const result = RegxMatch(str, pattern, flags);
			logger.info({pattern, str, result});
		};
		testReg('david@mediconcen');
	});
	it('test IsFloat', () => {
		const test = (number) => {
			logger.info(number, 'isFloat', isFloat(number));
		};

		test(1);
		test(0);
		test(null);
		test(undefined);
		test('1');
		test('1.10');
		test(1.10);
		test(1.00);
		console.log('Number.isInteger(1.00)', Number.isInteger(1.00));
	});
	it('test bytes2String', () => {
		const bytes = [15, 14, 33, 78];
		logger.info(bytes, 'bytesToString', bytes2String(bytes));
	});
	it('test Base64', () => {
		const dataString = 'abc';
		const base64encoded = base64.encode(dataString);
		logger.info('base64.encode', base64encoded);
		logger.info('base64.decode', base64.decode(base64encoded));
	});
	it('test dateFormat', () => {
		const date = new Date('2021-03-30T15:10:05.101Z');

		const dateString = dateFormat('yyyyMMdd', date);
		assert.strictEqual(dateString, '20210330');
	});
	it('test int2Chars', () => {
		logger.info(int2Chars(1, charSpace));
		logger.info(int2Chars(2, charSpace));

		logger.info(int2Chars(50, charSpace));
		logger.info(int2Chars(51, charSpace));
	});
	it('test chars2Hex', () => {
		logger.info('chars2Hex', chars2Hex('=!f'));

	});
	it('test isPath', () => {
		logger.info('isPath', isPath(''));
		logger.info('isPath', isPath());
		logger.info('isPath', isPath(null));
	});
});

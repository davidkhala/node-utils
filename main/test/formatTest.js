const {int2Chars, dateFormat, chars2Hex, isPath, RegxMatch, isFloat, bytes2String, base64} = require('../format');
const charSpace = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const logger = require('khala-logger/log4js').consoleLogger('test:format');
const dateString = dateFormat('yyyyMMdd', new Date());

const testReg = (str) => {
	const pattern = /[*|,":<>\[\]{}`';()@&$#%]/;
	const flags = 'i';//m|i|g
	const result = RegxMatch(str, pattern, flags);
	logger.info({pattern, str, result});
};
const testIsFloat = () => {
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
	console.log(`Number.isInteger(1.00)`, Number.isInteger(1.00));
};

const testBytes = (bytes = [15, 14, 33, 78]) => {
	logger.info(bytes, 'bytesToString', bytes2String(bytes));

};
const testBase64 = (dataString = 'abc') => {
	const base64encoded = base64.encode(dataString);
	logger.info('base64.encode', base64encoded);
	logger.info('base64.decode', base64.decode(base64encoded));
};

const tasks = () => {
	logger.info(dateString, 'should be in format of', '20181025');

	logger.info(int2Chars(1, charSpace));
	logger.info(int2Chars(2, charSpace));

	logger.info(int2Chars(50, charSpace));
	logger.info(int2Chars(51, charSpace));

	logger.info('chars2Hex', chars2Hex('=!f'));
	logger.info('isPath', isPath(''));
	logger.info('isPath', isPath());
	logger.info('isPath', isPath(null));
	testReg('david@mediconcen');
	testBase64();
};
tasks();

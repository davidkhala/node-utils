const {int2Chars, dateFormat, chars2Hex, isPath, RegxMatch, isFloat, bytes2String} = require('../format');
const charSpace = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const logger = require('../.').devLogger('test:format');
const dateString = dateFormat('yyyyMMdd', new Date());
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
};


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
	console.log(Number.isInteger(1.00));//TODO how nodejs distinguished
};

const testBytes = (bytes) => {
	logger.info(bytes, 'bytesToString', bytes2String(bytes));
};

testBytes([15, 14, 33, 78]);
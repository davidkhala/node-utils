import {splitBySpace} from '../syntax.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';
import {isArrayEven, isFloat, RegXMatch} from '../syntax.js';
import assert from 'assert';

const logger = consoleLogger('syntax test');

describe('test:syntax', () => {
	it('splitBySpace', () => {
		const str = ` 
/home/davidliu/Documents/delphi-fabric/common/bin/configtxlator 
start \
--hostname=0.0.0.0 
--port=7059  
--CORS=* `;
		const tokens = splitBySpace(str);
		logger.debug(tokens);
	});
	it('arrayEvenTest', () => {
		logger.debug(isArrayEven());
		logger.debug(isArrayEven([]));
		logger.debug(isArrayEven([1]));
	});
	it('IsFloat', () => {
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
		assert.strictEqual(Number.isInteger(1.00), true, 'Number.isInteger(1.00) should be true');
	});
	it('RegX', () => {
		const testReg = (str) => {
			const pattern = /[*|,":<>[\]{}`';()@&$#%]/;
			const flags = 'i';// m|i|g
			const result = RegXMatch(str, pattern, flags);
			logger.info({pattern, str, result});
		};
		testReg('david@mediconcen');
	});
});



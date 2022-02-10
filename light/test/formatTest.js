import {int2Chars, chars2Hex, bytes2String, base64} from '../format.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';
import fs from 'fs';
import path from 'path';
import assert from 'assert';

const logger = consoleLogger('test:format');
const charSpace = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

describe('format test', () => {


	it('bytes2String', () => {
		const bytes = [15, 14, 33, 78];
		logger.info(bytes, 'bytesToString', bytes2String(bytes));
	});
	it('Base64', () => {
		const dataString = 'abc';
		const base64encoded = base64.encode(dataString);
		logger.info('base64.encode', base64encoded);

		assert.strictEqual(base64.decode(base64encoded), dataString);
	});

	it('int2Chars', () => {
		logger.info(int2Chars(1, charSpace));
		logger.info(int2Chars(2, charSpace));

		logger.info(int2Chars(50, charSpace));
		logger.info(int2Chars(51, charSpace));
	});
	it('chars2Hex', () => {
		logger.info('chars2Hex', chars2Hex('=!f'));

	});

});

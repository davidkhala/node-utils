import {int2Chars, chars2Hex, bytes2String, base64, hex2chars, md5} from '../format.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';
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
		const name = 'lgreen';
		assert.strictEqual(base64.encode(name), 'bGdyZWVu');
	});
	it('md5', () => {
		const password = 'p4ssw0rd';
		assert.strictEqual(md5(password), '2a9d119df47ff993b662a8ef36f9ea20');
	});

	it('int2Chars', () => {
		logger.info(int2Chars(1, charSpace));
		logger.info(int2Chars(2, charSpace));

		logger.info(int2Chars(50, charSpace));
		logger.info(int2Chars(51, charSpace));
	});
	it('chars2Hex', () => {
		const raw = '=!f';
		logger.info('chars2Hex', chars2Hex(raw));
		assert.strictEqual(hex2chars(chars2Hex(raw)), raw);

	});

});

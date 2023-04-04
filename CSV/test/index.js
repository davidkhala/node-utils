import path from 'path';
import {FromFile, ToFile} from '../index.js';
import {filedirname} from '@davidkhala/light/es6.mjs';
import * as assert from 'assert';

filedirname(import.meta);
describe('CSV', () => {

	it('FromFile', () => {
		const recoveredJSON = FromFile(path.resolve(__dirname, 'test.csv'));
		console.info(recoveredJSON);
	});
	it('ToFile', () => {
		const recoveredCSV = ToFile([
			{a: 'b', c: 'd'},
			{a: 'b', c: 'd', Column1: 'foo', Column2: 'bar',}
		]);
		const expected = `a,c,Column1,Column2
b,d,,
b,d,foo,bar`
		assert.strictEqual(recoveredCSV, expected)
		console.debug(recoveredCSV);
	});
	it('ToFile: boundary', () => {
		const recoveredCSV = ToFile([]);
		assert.strictEqual(recoveredCSV, '');

	});
});




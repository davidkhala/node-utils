import path from 'path';
import {FromFile, ToFile} from '../index.js';
import {filedirname} from '@davidkhala/light/es6.mjs';
import * as assert from 'assert';

filedirname(import.meta);
describe('FromFile', () => {

	it('dummy', () => {
		const recoveredMatrix = FromFile(path.resolve(__dirname, 'dummy.csv'));
		console.info(recoveredMatrix);
	});
	it('sample', () => {
		const recoveredMatrix = FromFile(path.resolve(__dirname, 'HRDataset_v14.csv'));
		console.info(recoveredMatrix);
	});

});

describe('ToFile', () => {
	it('dummy', () => {
		const opts = {newline: '\n'};
		const recoveredCSV = ToFile([
			{a: 'b', c: 'd'},
			{a: 'b', c: 'd', Column1: 'foo', Column2: 'bar',}
		], opts);
		const expected = `a,c,Column1,Column2
b,d,,
b,d,foo,bar`;
		assert.strictEqual(recoveredCSV, expected);
		console.debug(recoveredCSV);
	});
	it('boundary', () => {
		const recoveredCSV = ToFile([]);
		assert.strictEqual(recoveredCSV, '');

	});
});




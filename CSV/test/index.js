import path from 'path';
import {FromFile, ToFile} from '../index';
import {filedirname} from '@davidkhala/light/es6.mjs';
filedirname(import.meta)
describe('CSV', () => {

	it('FromFile', () => {
		const recoveredJSON = FromFile(path.resolve(__dirname, 'test.csv'));
		console.info(recoveredJSON);
	});
	it('ToFile', () => {
		const recoveredCSV = ToFile([{a: 'b', c: 'd'}, {
			Column1: 'foo', a: 'b',
			Column2: 'bar', c: 'd'
		}]);
		console.debug(recoveredCSV);
	});
});




const path = require('path');
const {FromFile, ToFile} = require('../index');

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




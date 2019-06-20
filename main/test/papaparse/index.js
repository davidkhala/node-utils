const path = require('path');
const {csv} = require('../../format');

const recoveredJSON = csv.parseFile(path.resolve(__dirname, 'test.csv'));
console.log(recoveredJSON);
const recoveredCSV = csv.toCSV([{a: 'b', c: 'd'}, {
	Column1: 'foo', a: 'b',
	Column2: 'bar', c: 'd'
}]);
console.log(1, recoveredCSV);
console.log(2, recoveredCSV);


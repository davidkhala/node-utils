const {isDirectory} = require('../index');
const path = require('path');
const assert = require('assert');
const fs = require('fs');
describe('index Test', () => {
	it('isDir', () => {
		assert.ok(isDirectory(__dirname));
		const notExist = path.resolve(__dirname, 'abc');
		assert.ok(!isDirectory(notExist));
		const aFile = path.resolve(__dirname, 'randomTest.js');
		assert.ok(!isDirectory(aFile) && fs.existsSync(aFile));
	});
});
const path = require('path');
const fs = require('fs');

const CommonJSRequireSmoke = (rootFolder) => {
	const allFiles = fs.readdirSync(rootFolder).filter(fileName => fileName.endsWith('.js'));
	allFiles.forEach(file => {
		require(path.resolve(rootFolder, file));
	});
};
module.exports = {
	CommonJSRequireSmoke
};
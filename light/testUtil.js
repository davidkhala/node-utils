import path from 'path';
import fs from 'fs';

export const CommonJSRequireSmoke = (rootFolder) => {
	const allFiles = fs.readdirSync(rootFolder).filter(fileName => fileName.endsWith('.js'));
	allFiles.forEach(file => {
		require(path.resolve(rootFolder, file));
	});
};
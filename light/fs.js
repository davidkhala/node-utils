import Path from 'path';
import fs from 'fs';
import os from 'os';

export function homeResolve(...tokens) {
	if (!tokens) {
		return tokens;
	}
	return Path.resolve(os.homedir(), ...tokens);
}

export function read(_path) {
	return fs.readFileSync(_path, 'utf8');
}

export function write(_path, data) {
	fs.writeFileSync(_path, data);
}

export function isHiddenFile({path}) {
	const basename = Path.basename(path);
	return basename !== '.' && basename[0] === '.';
}

export const isPath = (str) => !!str && !(str === Path.basename(str));

export const isDirectory = (file) => fs.existsSync(file) && fs.lstatSync(file).isDirectory();

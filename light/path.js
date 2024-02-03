import Path from 'path';
import os from 'os';

export function homeResolve(...tokens) {
	if (!tokens) {
		return tokens;
	}
	return Path.resolve(os.homedir(), ...tokens);
}

export function isHiddenFile(path) {
	const basename = Path.basename(path);
	return basename !== '.' && basename[0] === '.';
}

export const splitPath = (dir) => dir.split(Path.sep);
export const isPath = (str) => !!str && str !== Path.basename(str);



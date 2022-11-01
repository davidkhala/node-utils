import {URL} from 'url';
import fs from 'fs';
import path from 'path';
import os from 'os';

/**
 *
 * @param {ImportMeta} import_meta assign import.meta
 */
export const filedirname = (import_meta) => {
	let {pathname} = new URL('', import_meta.url);
	if (os.platform() === 'win32') {
		pathname = pathname.substring(1).split(path.posix.sep).join(path.sep);
	}

	global.__filename = pathname;
	global.__dirname = path.dirname(pathname);
};

export const importFrom = (jsonFile, import_meta) => {
	return JSON.parse(fs.readFileSync(new URL(jsonFile, import_meta.url).pathname, 'utf-8'));
};

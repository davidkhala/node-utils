import {URL} from 'url';
import fs from 'fs';

/**
 *
 * @param {ImportMeta} import_meta assign import.meta
 */
export const filedirname = (import_meta) => {
	global.__filename = new URL('', import_meta.url).pathname;
	global.__dirname = new URL('.', import_meta.url).pathname;
};

export const importFrom = (jsonFile, import_meta) => {
	return JSON.parse(fs.readFileSync(new URL(jsonFile, import_meta.url).pathname, 'utf-8'));
};

import {URL} from 'url';

/**
 *
 * @param {ImportMeta} import_meta assign import.meta
 */
export const filedirname = (import_meta) => {
	global.__filename = new URL('', import_meta.url).pathname;
	global.__dirname = new URL('.', import_meta.url).pathname;
};

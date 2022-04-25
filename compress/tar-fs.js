import tar from 'tar-fs';
import fs from 'fs';

/**
 * @typedef {Object} FileHeader
 * @property {string} name
 * @property {integer} mode
 * @property {Date} mtime
 * @property {integer} size
 * @property {string} type
 * @property {integer} uid
 * @property {integer} gid
 */
/**
 * @typedef {function(FileHeader, [console]):FileHeader} FileHeaderTransformer
 */

/**
 * @type FileHeaderTransformer
 */
export const defaultHeaderTransformer = (header, logger = console) => {
	logger.debug(header);
	return header;
};
/**
 * @type FileHeaderTransformer
 */
export const fabricPackageTransformer = (header) => {
	header.mtime = new Date(0);
	header.mode = 0o100644;
	header.uid = 500;
	header.gid = 500;
	// header.size is auto
	return header;
};

export class TarFs {
	constructor(logger = console) {
		this.logger = logger;
	}

	pack(src, dst, opts = {map: defaultHeaderTransformer}) {

		tar.pack(src, opts).pipe(fs.createWriteStream(dst));
	}
}

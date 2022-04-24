import tar from 'tar';
import fs from 'fs';
import path from 'path';
import {isDirectory} from '@davidkhala/light/index.js';

export const create = (dst, opt, src) => {
	Object.assign(opt, {
		gzip: true,
		sync: true,
		file: dst,
		portable: true,
		noMtime: true, // true to omit writing `mtime` (Modification time) values for entries
	});

	const entryOpt = Object.assign({
		cwd: isDirectory(src) ? src : path.dirname(src)
	}, opt);
	const files = fs.readdirSync(src);

	tar.c(entryOpt, files);

};

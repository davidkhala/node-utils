import tar from 'tar';
import fs from 'fs';
import {isDirectory} from '@davidkhala/light/index.js';

export const create = (dst, opt, ...src) => {
	Object.assign(opt, {
		gzip: true,
		sync: true,
		file: dst,
		mode: 0o100644,
		noMtime: true, // true to omit writing `mtime` (Modification time) values for entries
	});

	if (src.length === 1 && isDirectory(src[0])) {
		const src_dir = src[0];
		opt.cwd = src_dir;
		src = fs.readdirSync(src_dir);
	}

	tar.c(opt, src);

};

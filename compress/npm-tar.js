import tar from 'tar';
import fs from 'fs';
import {isDirectory} from '@davidkhala/light/index.js';

export const create = (dst, ...src) => {
	const opt = {
		gzip: true,
		sync: true,
		file: dst,
		mode: 0o100644,
	};
	if (src.length === 1 && isDirectory(src[0])) {
		const src_dir = src[0];
		opt.prefix = src_dir;
		opt.cwd = src_dir;
		src = fs.readdirSync(src_dir);
	}

	tar.c(opt, src);

};

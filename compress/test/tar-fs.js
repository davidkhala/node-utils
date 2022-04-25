import {TarFs} from '../tar-fs.js';
import path from 'path';
import {filedirname} from '@davidkhala/light/es6.mjs';
filedirname(import.meta);

describe('tar-fs', () => {
	it('pack', () => {
		const tar = new TarFs();
		const src = path.resolve(__dirname, 'fixture');
		const dst = path.resolve(__dirname, 'fixture.tar-fs.tar');
		tar.pack(src, dst);
	});
});
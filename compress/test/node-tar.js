import path from 'path';
import {create} from '../npm-tar.js';
import {sha2_256} from 'khala-fabric-formatter/helper.js';
import fs from 'fs';
import {sleep} from '@davidkhala/light';
import {filedirname} from '@davidkhala/light/es6.mjs';
filedirname(import.meta);

describe('tar', function () {
	this.timeout(0);
	it('gzip single directory', async () => {

		const src = path.resolve(__dirname, 'fixture');
		const dst = path.resolve(__dirname, 'fixture.tar');

		create(dst, {}, src);

		const digest = sha2_256(fs.readFileSync(dst).toString());

		fs.unlinkSync(dst);
		await sleep(1000);
		create(dst, {}, src);
		const digest2 = sha2_256(fs.readFileSync(dst).toString());
		console.debug(digest === digest2);

	});

});
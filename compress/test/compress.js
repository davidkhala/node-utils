import {filedirname} from '@davidkhala/light/es6.mjs';
import {sha2_256} from 'khala-fabric-formatter/helper.js';
import path from 'path';
import fs from 'fs';
import compressing from 'compressing';
import {sleep} from '@davidkhala/light';
import assert from 'assert';

filedirname(import.meta);


describe('compress', function () {
	this.timeout(0);

	it('compressing: result time-inconsistent', async () => {
		const src = path.resolve(__dirname, './fixture');
		const dst2 = path.resolve(__dirname, 'fixture2.tgz');
		await compressing.tgz.compressDir(src, dst2, {
			ignoreBase: true,
		});
		const digest = sha2_256(fs.readFileSync(dst2).toString());
		fs.unlinkSync(dst2);
		await sleep(1000);
		await compressing.tgz.compressDir(src, dst2, {
			ignoreBase: true,
		});
		const digest2 = sha2_256(fs.readFileSync(dst2).toString());
		fs.unlinkSync(dst2);
		assert.notEqual(digest, digest2);
	});


});
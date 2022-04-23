import {filedirname} from '@davidkhala/light/es6.mjs';
import {sha2_256} from 'khala-fabric-formatter/helper.js';
import path from 'path';
import fs from 'fs';
import compressing from 'compressing';
import {sleep} from '@davidkhala/light';
import assert from 'assert';
import {create} from '../npm-tar.js';
import fsExtra from 'fs-extra';

filedirname(import.meta);

describe('compress', function () {
	this.timeout(0);

	it('tar: zip a directory', async () => {

		const src = path.resolve(__dirname, 'fixture');
		const dst = path.resolve(__dirname, 'fixture.tgz');
		const srcCopy = path.resolve('src');
		fsExtra.copySync(src, srcCopy, {preserveTimestamps: true});
		create(dst, src);

		const digest = sha2_256(fs.readFileSync(dst).toString());


		create(dst, srcCopy);
		const digestCopy = sha2_256(fs.readFileSync(dst).toString());
		console.debug({digestCopy});// 2a7724dfc54f02559e9909d1204ad9113b3c33bf928978ba6b5d5e987750bd25
		fs.unlinkSync(dst);
		await sleep(1000);
		create(dst, src);
		const digest2 = sha2_256(fs.readFileSync(dst).toString());
		console.debug(digest === digest2);

	});

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
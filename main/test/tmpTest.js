import fs from 'fs';
import assert from 'assert';
import {createTmpFile, createTmpDir, randomName} from '../tmp.js';
import {isDirectory} from '@davidkhala/light/file.js';
import {tempdir} from '@davidkhala/light/devOps.js';

describe('test:npm tmp', function () {
	this.timeout(0);
	it('file create', () => {
		const [name, cb] = createTmpFile();
		assert.ok(fs.existsSync(name));
		assert.ok(name.startsWith(tempdir));
		cb();
	});
	it('directory create', () => {
		const [name, cb] = createTmpDir();
		assert.ok(isDirectory(name));
		assert.ok(name.startsWith(tempdir));
		cb();
	});
	it('generate name', () => {
		const name = randomName();
		assert.ok(!fs.existsSync(name));
		assert.ok(name.startsWith(tempdir));
	});
});
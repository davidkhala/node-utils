import {PM2} from '../index.js';
import path from 'path';
import {filedirname} from '@davidkhala/light/es6.mjs';

describe('api test', () => {
	const pm2 = new PM2();
	const name = 'express';
	before(async () => {
		filedirname(import.meta);
		await pm2.connect();
	});

	it('create an process', async () => {
		const script = path.resolve(__dirname, 'express.js');
		await pm2.run({name, script});

		const description = await pm2.get(name);
		console.debug(description);
	});
	after(async () => {
		await pm2.delete(name);
		pm2.disconnect();
	});
});
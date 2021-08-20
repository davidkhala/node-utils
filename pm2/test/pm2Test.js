const {PM2} = require('../index');
const path = require('path');


describe('api test', () => {
	const pm2 = new PM2();
	const name = 'express';
	before(async () => {
		await pm2.connect();
	});
	const script = path.resolve(__dirname, 'express.js');
	it('create an process', async () => {

		await pm2.run({name, script});

		const description = await pm2.get(name);
		console.debug(description);
	});
	after(async () => {
		await pm2.delete(name);
		pm2.disconnect();
	});
});
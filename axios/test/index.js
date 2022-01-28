import {axiosPromise} from '../index.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';
import {filedirname} from '@davidkhala/light/es6.mjs';
import assert from 'assert';
import fs from 'fs';
import FormData from 'form-data';

filedirname(import.meta);
const logger = consoleLogger('test:axios');
// server based on davidkhala/express-pong
describe('https', () => {
	const port = 3443;
	const cert = new URL('cert.pem', import.meta.url);
	it.skip('ping', async () => { // TODO: skip due to :Error: certificate has expired


		const resp = await axiosPromise({
			url: `https://localhost:${port}`,
			method: 'GET'
		}, {
			cert
		});

		logger.info(resp);
	});
});
describe('http', () => {
	const port = 3000;

	it('formData case', async () => {


		const form = new FormData();
		form.append('files', fs.createReadStream(__dirname + '/web_ic_hyperledger.png'));

		const resp = await axiosPromise({
			url: `http://localhost:${port}/formData`,
			formData: form
		});
		logger.info(resp);
	});
	it('url-encoded post case', async () => {
		const resp = await axiosPromise({
			url: `http://localhost:${port}/post`,
			body: {a: 'b'}
		});
		logger.info(resp);
	});
	it('ping', async () => {
		const resp = await axiosPromise({url: `http://localhost:${port}`, method: 'GET'});
		logger.info(resp);
	});
});
describe('http: error filter', () => {
	const port = 3000;
	it('propose', async () => {
		const url = `http://localhost:${port}/500`;
		try {
			await axiosPromise({url}, {rejectUnauthorized: false});
		} catch (e) {
			logger.error(e);
			assert.strictEqual(e.statusCode, 404);
			assert.strictEqual(e.statusMessage, 'Not Found');
		}
	});

});

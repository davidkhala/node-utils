const {axiosPromise} = require('../index');
const logger = require('khala-logger/log4js').consoleLogger('test:axios');
const path = require('path');
const assert = require('assert');
// server based on davidkhala/express-pong
describe('https', () => {
	const port = 3443;
	const cert = path.resolve(__dirname, 'cert.pem');
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
		const fs = require('fs');
		const FormData = require('form-data');

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

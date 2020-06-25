const {axiosPromise} = require('../index');
const logger = require('khala-logger/log4js').consoleLogger('test:axios');

describe('axios', () => {
	const url = 'http://localhost:3000';
	const tlsUrl = 'https://localhost:3443';
	it('url-encoded https post case', async () => {
		const resp = await axiosPromise({
			url: `${tlsUrl}/post`,
			body: {mcc: 'david'}
		}, {
			rejectUnauthorized: false
		});

		logger.info(resp);
	});
	it('formData case', async () => {
		const fs = require('fs');
		const FormData = require('form-data');

		const form = new FormData();
		form.append('files', fs.createReadStream(__dirname + '/web_ic_hyperledger.png'));

		const resp = await axiosPromise({
			url: `${url}/formData`,
			formData: form
		});
		logger.info(resp);
	});
	it('url-encoded post case', async () => {
		const resp = await axiosPromise({
			url: `${url}/post`,
			body: {a: 'b'}
		});
		logger.info(resp);
	});
	it('http get', async () => {
		const resp = await axiosPromise({url, method: 'GET'});
		logger.info(resp);
	});
});




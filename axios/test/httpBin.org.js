const {axiosPromise} = require('../index');
const logger = require('khala-logger/log4js').consoleLogger('test:axios');
const path = require('path');
describe('httpbin.org: https', () => {
	const cert = path.resolve(__dirname, 'httpbin.org.pem');
	it('get', async () => {

		const url = 'https://eu.httpbin.org:443/get';
		const resp = await axiosPromise({
			url,
			method: 'GET'
		}, {
			cert
		});

		logger.info(resp);
	});
});
describe('httpbin.org: http', () => {

	it('get', async () => {

		const url = 'http://eu.httpbin.org/get';

		const resp = await axiosPromise({
			url, method: 'GET'
		});
		logger.info(resp);
	});
});
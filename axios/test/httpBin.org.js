import {axiosPromise} from '../index.js';
import {consoleLogger} from 'khala-logger/log4js.js';
import {URL} from 'url'
const logger = consoleLogger('test:axios');
describe('httpbin.org: https', () => {
	const cert = new URL('httpbin.org.pem', import.meta.url).pathname;

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
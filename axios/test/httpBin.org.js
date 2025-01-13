import axiosPromise from '../index.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';
import {URL} from 'url'
const logger = consoleLogger('test:axios');
describe('httpbin.org: https', function () {
	this.timeout(0)
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
describe('httpbin.org: http', function () {
	this.timeout(0)
	it('get', async () => {

		const url = 'http://eu.httpbin.org/get';

		const resp = await axiosPromise({
			url, method: 'GET'
		});
		logger.info(resp);
	});
});
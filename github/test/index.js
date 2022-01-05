import * as GithubRestAPI from '../index.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';

const logger = consoleLogger('Github API');
describe('github Rest API', () => {
	it('public access', () => {
		const api = new GithubRestAPI();
	});
	it('private access', () => {
		const token = process.env.GITHUB_TOKEN;
		const api = new GithubRestAPI({token});
	});

});


const GithubRestAPI = require('../');
const logger = require('khala-logger/log4js').consoleLogger('Github API');

describe('github Rest API', () => {
	it('public access', () => {
		const api = new GithubRestAPI();
	});
	it('private access', () => {
		const token = process.env.GITHUB_TOKEN;
		const api = new GithubRestAPI({token});
	});

});


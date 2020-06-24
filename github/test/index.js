const GithubRestAPI = require('../');
const logger = require('khala-logger/log4js');

describe('github Rest API', () => {
	it('public access', async () => {
		const api = new GithubRestAPI();
	});
	it('private access', async () => {
		const token = process.env.GITHUB_TOKEN;
		const api = new GithubRestAPI({token});
	});

});


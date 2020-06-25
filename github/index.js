const {Octokit} = require('@octokit/rest');

class GithubRestAPI {
	/**
	 * @param [token]
	 */
	constructor({token} = {}) {
		const opts = {};
		if (token) {
			Object.assign(opts, {
				auth: token
			});
		}
		this.octokit = new Octokit(opts);
	}

}

module.exports = GithubRestAPI;



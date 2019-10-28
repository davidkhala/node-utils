const Octokit = require('@octokit/rest');

class GithubAPI {
	constructor(username, password, {twoFA} = {}) {
		this.octokit = new Octokit({
			auth: {
				username, password, on2fa: async () => {
					return twoFA;
				}
			}

		});
	}

	async createToken(name, {scopes}) {
		const {data} = await this.octokit.oauthAuthorizations.createAuthorization({note: name, scopes});
		return data;
	}
}

module.exports = GithubAPI;



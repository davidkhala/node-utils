import {Octokit} from '@octokit/rest';

export default class GithubRestAPI {
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



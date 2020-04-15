const {axiosPromise} = require('khala-axios');

/**
 * https://docs.travis-ci.com/user/running-build-in-debug-mode/#restarting-a-job-in-debug-mode-via-api
 * @param token API token from [your profile page](https://travis-ci.com/profile)
 * @param id Job id, got from under 'Job log -> Build system information'
 * @return {Promise<void>}
 */
const debugBuild = async (token, id) => {
	const headers = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Travis-API-Version': '3',
		Authorization: `token ${token}`
	};
	const body = {quiet: true};
	const url = `https://api.travis-ci.com/job/${id}/debug`;
	await axiosPromise({url, body}, {headers});
};
debugBuild(process.env.token, process.env.jobId).catch(err => {
	console.error(err.response.data);
});
// https://docs.travis-ci.com/user/running-build-in-debug-mode/#restarting-a-job-in-debug-mode-via-api

// curl -s -X POST \
//   -H "Content-Type: application/json" \
//   -H "Accept: application/json" \
//   -H "Travis-API-Version: 3" \
//   -H "Authorization: token ********************" \
//   -d "{\"quiet\": true}" \
//   https://api.travis-ci.com/job/${id}/debug
const {axiosPromise} = require('khala-axios');
const debugBuild = async () => {
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
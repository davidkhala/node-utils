const GithubAPI = require('../');
const api = new GithubAPI('davidkhala', process.env.password, {twoFA: process.env.OTP});
const scopes = ['user', 'public_repo', 'repo', 'repo:status', 'delete_repo', 'gist'];

const task = async () => {
	const result = await api.createToken('abc', {scopes});
	console.log(result.token);

};
task();


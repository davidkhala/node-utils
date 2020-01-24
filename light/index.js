const os = require('os');

exports.homeResolve = (...tokens) => {
	if (!tokens) {
		return tokens;
	}
	return path.resolve(os.homedir(), ...tokens);
};

exports.sleep = async (ms, silent) => {
	if (!silent) {
		console.debug(`sleep ${ms}ms`);
	}
	return new Promise(resolve => setTimeout(resolve, ms));
};
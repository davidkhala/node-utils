const logger = require('./logger').new('helper util');
const os = require('os');
const path = require('path');
exports.hostname = os.hostname;

exports.homeResolve = (...tokens) => {
	if (!tokens) return tokens;
	return path.resolve(os.homedir(), ...tokens);
};
exports.randomKeyOf = (obj) => {
	const keys = Object.keys(obj);
	const keyIndex = Math.floor(Math.random() * Math.floor(keys.length));
	return keys[keyIndex];
};
exports.JSONReadable = (data) => JSON.stringify(data, null, 2);
exports.JSONEqual = (json1, json2) => {
	return JSON.stringify(JSON.parse(json1)) === JSON.stringify(JSON.parse(json2));
};

const sleep = async (ms) => {
	logger.info(`sleep ${ms}ms`);
	return new Promise(resolve => setTimeout(resolve, ms));
};
exports.sleep = sleep;
const util = require('util');
exports.exec = util.promisify(require('child_process').exec);

const looper = async (opts = {interval: 1000}, task, ...taskParams) => {
	const {times, interval} = opts;

	if (Number.isInteger(times)) {
		for (let i = 0; i < times; i++) {
			await task(...taskParams);
			await sleep(interval);
		}
	} else {
		await task(...taskParams);
		await sleep(interval);
		await looper(opts, task, ...taskParams);
	}
};
exports.looper = looper;
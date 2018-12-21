const logger = require('./logger').new('helper util');
const os = require('os');
const path = require('path');
exports.fsExtra = require('fs-extra');
exports.homeResolve = (...tokens) => {
	if (!tokens) return tokens;
	return path.resolve(os.homedir(), ...tokens);
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
const dateFormatter = require('date-format');
exports.dateFormat = (format, date) => {
	return dateFormatter(format, date);
};

exports.isArrayEven = arr => {
	return Array.isArray(arr) && arr.length > 0 && arr.every(v => v === arr[0]);
};
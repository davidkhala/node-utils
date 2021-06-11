const os = require('os');
const path = require('path');
const fs = require('fs');

const homeResolve = (...tokens) => {
	if (!tokens) {
		return tokens;
	}
	return path.resolve(os.homedir(), ...tokens);
};

const sleep = async (ms, logger = console) => {
	if (logger) {
		logger.debug(`sleep ${ms}ms`);
	}
	return new Promise(resolve => setTimeout(resolve, ms));
};
const isArrayEven = arr => {
	return Array.isArray(arr) && arr.length > 0 && arr.every(v => JSON.stringify(v) === JSON.stringify(arr[0]));
};

const isDirectory = (file) => fs.existsSync(file) && fs.lstatSync(file).isDirectory();
/**
 * @param {string} command
 * @param {Object} [options]
 * @return {string}
 */
const execSync = (command, options = {}) => childProcess.execSync(command, Object.assign(options, {encoding: 'utf-8'}));
module.exports = {
	isDirectory,
	execSync,
	isArrayEven,
	homeResolve,
	sleep,
};
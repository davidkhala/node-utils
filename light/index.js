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
const execSync = (command, options = {}) => require('child_process').execSync(command, Object.assign(options, {encoding: 'utf-8'}));
/**
 *
 * @param {Uint8Array} array
 * @return {string}
 */
const Uint8Array2String = (array) => array.toString();
/**
 *
 * @param {string} str comma split string
 * @return {Uint8Array}
 */
const String2Uint8Array = (str) => Uint8Array.from(str.split(','));
module.exports = {
	isDirectory,
	execSync,
	isArrayEven,
	homeResolve,
	sleep,
	Uint8Array2String, String2Uint8Array,
};
import os from 'os';
import path from 'path';
import fs from 'fs';
import child_process from 'child_process';

export const homeResolve = (...tokens) => {
	if (!tokens) {
		return tokens;
	}
	return path.resolve(os.homedir(), ...tokens);
};

export const sleep = async (ms, logger = console) => {
	if (logger) {
		logger.debug(`sleep ${ms}ms`);
	}
	return new Promise(resolve => setTimeout(resolve, ms));
};
export const isArrayEven = arr => {
	return Array.isArray(arr) && arr.length > 0 && arr.every(v => JSON.stringify(v) === JSON.stringify(arr[0]));
};

export const isDirectory = (file) => fs.existsSync(file) && fs.lstatSync(file).isDirectory();
/**
 * @param {string} command
 * @param {Object} [options]
 * @return {string}
 */
export const execSync = (command, options = {}) => {
	return child_process.execSync(command, Object.assign(options, {encoding: 'utf-8'}));
};
/**
 *
 * @param {Uint8Array} array
 * @return {string}
 */
export const Uint8Array2String = (array) => array.toString();
/**
 *
 * @param {string} str comma split string
 * @return {Uint8Array}
 */
export const String2Uint8Array = (str) => Uint8Array.from(str.split(','));

import os from 'os';
import path from 'path';
import fs from 'fs';

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
export const isPath = (str) => !!str && !(str === path.basename(str));

export const isDirectory = (file) => fs.existsSync(file) && fs.lstatSync(file).isDirectory();

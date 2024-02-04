import {consoleLogger} from '@davidkhala/logger/log4.js';
import {homedir} from '@davidkhala/light/devOps.js';
import path from 'path';
const logger = consoleLogger('helper util');
export const trimExtName = (filePath) => path.basename(filePath, path.extname(filePath));
export const homeResolve = (...tokens) => {
	if (!tokens) {
		return tokens;
	}
	return path.resolve(homedir, ...tokens);
};

export const JSONEqual = (json1, json2) => {
	return JSON.stringify(JSON.parse(json1)) === JSON.stringify(JSON.parse(json2));
};
export const ObjectEqual = (object1, object2) => {
	return JSON.stringify(object1) === JSON.stringify(object2);
};
export const sleep = async (ms, silent) => {
	if (!silent) {
		logger.debug(`sleep ${ms}ms`);
	}
	return new Promise(resolve => setTimeout(resolve, ms));
};

export const looper = async (task, opts = {interval: 1000}, ...taskParams) => {
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

/**
 * @param key
 * @param data
 * @param force
 * @param {boolean} [stringOnly]
 */
export const envInject = (key, data, force, stringOnly) => {

	switch (typeof data) {
		case 'bigint':
		case 'boolean':
			if (stringOnly) {
				data = data.toString();
			}
			break;
		case 'number':
		case 'string':
		case 'symbol':
		case 'function':
		case 'undefined':
		case 'object':
			if (stringOnly) {
				data = JSON.stringify(data);
			}
			break;
		default:
			throw Error(`unknown type of data:${typeof data}`);
	}
	if (process.env[key]) {
		if (force) {
			logger.warn(`overwrite process.env.${key}`);
		} else {
			throw Error(`process.env.${key} already exists`);
		}
	}
	process.env[key] = data;
};


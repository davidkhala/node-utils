const logger = require('khala-logger').new('helper util');
const devOps = require('./devOps');
const path = require('path');
const childProcess = require('child_process');
exports.fsExtra = require('fs-extra');
exports.homeResolve = (...tokens) => {
	if (!tokens) {
		return tokens;
	}
	return path.resolve(devOps.homedir, ...tokens);
};

exports.JSONEqual = (json1, json2) => {
	return JSON.stringify(JSON.parse(json1)) === JSON.stringify(JSON.parse(json2));
};

const sleep = async (ms, silent) => {
	if (!silent) {
		logger.debug(`sleep ${ms}ms`);
	}
	return new Promise(resolve => setTimeout(resolve, ms));
};
exports.sleep = sleep;
const util = require('util');
/**
 * @typedef {Object} execResponse
 * @property {string} stdout
 * @property {string} stderr
 */

/**
 * @async
 * @param {string} command
 * @param {Object} options
 * @return Promise<execResponse>
 */
exports.exec = util.promisify(childProcess.exec);

/**
 * powered by https://stackoverflow.com/questions/25323703/nodejs-execute-command-in-background-and-forget
 * @param {string} command
 * @param {string} stdLogFile
 */
exports.execDetach = (command, stdLogFile) => {
	const {spawn} = childProcess;
	const stdio = ['ignore'];


	const [cmd, ...args] = command.split(' ');

	if (stdLogFile) {
		stdio.push(fs.openSync(stdLogFile, 'a'));// for stdout
		stdio.push(fs.openSync(stdLogFile, 'a'));// for stderr
	}

	spawn(cmd, args, {
		stdio, // piping all stdio to /dev/null
		detached: true
	}).unref();
};


exports.execResponsePrint = ({stdout, stderr}) => {
	console.log('stdout[start]\n', stdout, '\n[end]stdout');
	console.error('stderr[start]\n', stderr, '\n[end]stderr');
};

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

/**
 * TODO full test for pm2
 * @param key
 * @param data
 * @param force
 * @param pm2Simulator
 */
exports.envInject = (key, data, force, pm2Simulator) => {

	switch (typeof data) {
		case 'bigint':
		case 'boolean':
			if (pm2Simulator) {
				data = data.toString();
			}
			break;
		case 'number':
		case 'string':
		case 'symbol':
		case 'function':
		case 'undefined':
		case 'object':
			if (pm2Simulator) {
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

exports.isArrayEven = arr => {
	return Array.isArray(arr) && arr.length > 0 && arr.every(v => JSON.stringify(v) === JSON.stringify(arr[0]));
};


import find_process from 'find-process';
import {execSync} from '@davidkhala/light';

/**
 * @typedef {Object} processObject
 * @property {number} pid
 * @property {number} [ppid]
 * @property {number} [uid]
 * @property {number} [gid]
 * @property {string} name
 * @property {string} cmd
 */

/**
 *
 * @param {string|RegExp} [name]
 * @param {string|number|RegExp} [pid]
 * @param {string|number} [port]
 * @param {boolean} [strict]
 * @param {boolean} [verbose]
 * @return {processObject|string[]}
 */
export async function findProcess({name, pid, port}, strict, verbose) {
	execSync('netstat >/dev/null'); // throw if not exist

	let result;
	if (port) {
		result = await find_process('port', port, strict);
	}
	if (name) {
		result = await find_process('name', name, strict);
	}
	if (pid) {
		result = await find_process('pid', pid, strict);
	}
	if (!verbose) {
		return result.map(({pid: _pid}) => _pid);
	} else {
		return result;
	}
}
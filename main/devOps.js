const localhost = '127.0.0.1';
exports.localhost = localhost;
const os = require('os');
const childProcess = require('child_process');
const findProcess = require('find-process');
exports.hostname = os.hostname;
exports.tempdir = os.tmpdir();
exports.homedir = os.homedir();
const util = require('util');

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
const exec = util.promisify(childProcess.exec);

exports.exec = exec;

/**
 *
 * @param {string} type "name" | "pid" | "port"
 * @param {string|number|RegExp} value
 * @param {boolean} [strict]
 * @returns {Promise<processObject[]>}
 */
exports.findProcess = async (type, value, strict) => {

	await exec('netstat >/dev/null'); // throw if not exist
	return findProcess(type, value, strict);
};
exports.killProcess = async (pid) => {
	await exec(`kill ${pid}`);
};

/**
 * powered by https://stackoverflow.com/questions/25323703/nodejs-execute-command-in-background-and-forget
 * @param {string} command
 * @param {string} [stdLogFile]
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

class NetSocket {
	constructor(port, host) {
		const {Socket} = require('net');
		this.socket = new Socket();
		this.port = port;
		this.host = host;
		this.listeners = {
			connect: undefined,
			timeout: undefined,
			error: undefined,
			close: undefined
		};
	}

	connect(timeout) {
		this.socket.setTimeout(timeout);
		this.socket.connect(this.port, this.host);
	}

	close() {
		this.socket.destroy();
	}

	setExclusiveListener(eventType, listener) {
		if (this.listeners[eventType]) {
			this.socket.removeListener(eventType, this.listeners[eventType]);
		}
		this.socket.on(eventType, listener);
		this.listeners[eventType] = listener;
	}
}

exports.NetSocket = NetSocket;

exports.isPortInUse = async (port, host = localhost, timeout = 1000) => {
	const socket = new NetSocket(port, host);
	return new Promise((resolve, reject) => {
		const onConnect = () => {
			socket.close();
			resolve(true);
		};
		const onTimeout = () => {
			socket.close();
			resolve(false);
		};
		const onError = (err) => {
			socket.close();
			if (err.code === 'ECONNREFUSED') {
				resolve(false);
			} else {
				reject(err);
			}
		};
		socket.setExclusiveListener('connect', onConnect);
		socket.setExclusiveListener('timeout', onTimeout);
		socket.setExclusiveListener('error', onError);
		socket.connect(timeout);
	});

};

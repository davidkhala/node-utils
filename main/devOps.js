const localhost = '127.0.0.1';
const os = require('os');
const childProcess = require('child_process');
const fs = require('fs');
const {splitBySpace} = require('./syntax');
const findProcess = require('find-process');
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
 * @param {string} command
 * @param {Object} [options]
 * @return {string}
 */
const execSync = (command, options = {}) => childProcess.execSync(command, Object.assign(options, {encoding: 'utf-8'}));

const killProcess = (pid) => {
	execSync(`kill ${pid}`);
};

/**
 * powered by https://stackoverflow.com/questions/25323703/nodejs-execute-command-in-background-and-forget
 * @param {string} command
 * @param {string} [stdLogFile]
 */
const execDetach = (command, stdLogFile) => {
	const {spawn} = childProcess;

	const [cmd, ...args] = splitBySpace(command);
	const ignore = 'ignore';// string 'ignore' is a key word
	// flag 'a' - Open file for appending. The file is created if it does not exist.
	const out = stdLogFile ? fs.openSync(stdLogFile, 'a') : ignore;// for stdout
	const err = stdLogFile ? fs.openSync(stdLogFile, 'a') : ignore;// for stderr
	const stdio = [ignore, out, err];

	spawn(cmd, args, {
		stdio, // piping all stdio to /dev/null
		detached: true
	}).unref();
};
const execStream = (command) => {
	const {spawn} = childProcess;
	const [cmd, ...args] = splitBySpace(command);
	return spawn(cmd, args, {stdio: 'inherit'});
};


const execResponsePrint = ({stdout, stderr}) => {
	if (stdout.trim()) {
		console.log('stdout[start]\n', stdout, '\n[end]stdout');
	}
	if (stderr.trim()) {
		console.error('stderr[start]\n', stderr, '\n[end]stderr');
	}
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

const isPortInUse = async (port, host = localhost, timeout = 1000) => {
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
module.exports = {
	localhost,
	ip: (addressOnly, ipv6) => {
		const interfaces = os.networkInterfaces();
		delete interfaces.lo;
		const resultSet = {};
		for (const [name, ipList] of Object.entries(interfaces)) {
			resultSet[name] = ipList.find(({family}) => family === ipv6 ? 'IPv6' : 'IPv4');
		}
		if (addressOnly) {
			return Object.values(resultSet).map(({address}) => address);
		}
		return resultSet;

	},
	os: {
		type: os.type(), // "Windows_NT"
		release: os.release(), // "10.0.14393"
		platform: os.platform(), // "win32" # https://nodejs.org/api/os.html#os_os_platform
	},
	hostname: os.hostname,
	tempdir: os.tmpdir(),
	homedir: os.homedir(),
	isPortInUse,
	NetSocket,
	execResponsePrint,
	execDetach,
	execStream,
	killProcess,
	execSync,
	/**
	 *
	 * @param {string|RegExp} [name]
	 * @param {string|number|RegExp} [pid]
	 * @param {string|number} [port]
	 * @param {boolean} [strict]
	 * @param {boolean} [verbose]
	 * @return {processObject|string[]}
	 */
	findProcess: async ({name, pid, port}, strict, verbose) => {
		execSync('netstat >/dev/null'); // throw if not exist

		let result;
		if (port) {
			result = await findProcess('port', port, strict);
		}
		if (name) {
			result = await findProcess('name', name, strict);
		}
		if (pid) {
			result = await findProcess('pid', pid, strict);
		}
		if (!verbose) {
			return result.map(({pid: _pid}) => _pid);
		} else {
			return result;
		}
	},
};
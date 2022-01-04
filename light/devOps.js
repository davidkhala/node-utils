export const localhost = '127.0.0.1';
import OS from 'os';
import childProcess from 'child_process';
import fs from 'fs';
import {Socket} from 'net';
import {splitBySpace} from './syntax.js';

/**
 * @param {string} command
 * @param {Object} [options]
 * @return string
 */
export const execSync = (command, options = {}) => childProcess.execSync(command, Object.assign(options, {encoding: 'utf-8'}));

export const killProcess = (pid) => {
	execSync(`kill ${pid}`);
};

/**
 * powered by https://stackoverflow.com/questions/25323703/nodejs-execute-command-in-background-and-forget
 * @param {string} command
 * @param {string} [stdLogFile]
 */
export const execDetach = (command, stdLogFile) => {
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
export const execStream = (command) => {
	const {spawn} = childProcess;
	const [cmd, ...args] = splitBySpace(command);
	return spawn(cmd, args, {stdio: 'inherit'});
};

export class NetSocket {
	constructor(port, host) {

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

export const isPortInUse = async (port, host = localhost, timeout = 1000) => {
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


export const ip = (addressOnly, ipv6) => {
	const interfaces = OS.networkInterfaces();
	delete interfaces.lo;
	const resultSet = {};
	for (const [name, ipList] of Object.entries(interfaces)) {
		resultSet[name] = ipList.find(({family}) => family === ipv6 ? 'IPv6' : 'IPv4');
	}
	if (addressOnly) {
		return Object.values(resultSet).map(({address}) => address);
	}
	return resultSet;

};
export const os = {
	type: OS.type(), // "Windows_NT"
	release: OS.release(), // "10.0.14393"
	platform: OS.platform(), // "win32" # https://nodejs.org/api/os.html#os_os_platform
};
export const hostname = OS.hostname(); 'localhost.localdomain';
export const tempdir = OS.tmpdir();// '/tmp'
export const homedir = OS.homedir();//

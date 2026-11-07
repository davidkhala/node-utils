import OS from 'node:os';
import childProcess from 'node:child_process';
import {Socket} from 'node:net';
import {promisify} from 'node:util';

const execFileAsync = promisify(childProcess.execFile);
export const localhost = '127.0.0.1';

export const execFileSync = (command, args = [], options = {}) => childProcess.execFileSync(command, args, {encoding: 'utf-8', ...options});


export const execFile = async (command, args = [], options = {}) =>
    execFileAsync(command, args, {encoding: 'utf-8', windowsHide: true, ...options});


export const killProcess = (pid) => execFileSync('kill', [pid]);


/**
 * Run in streaming mode; stdio is passed through to the current terminal by default.
 * @param {string} command
 * @param {string[]} [args]
 * @param {import('child_process').SpawnOptions} [options]
 * @returns {Promise} Resolves when the exit code is 0; otherwise rejects (err.code is the exit code).
 */
export const execStream = (command, args = [], options = {}) => new Promise((resolve, reject) => {
	const child = childProcess.spawn(command, args, {stdio: 'inherit', windowsHide: true, ...options});
	child.once('error', reject);
	child.once('close', (code, signal) => {
		if (code === 0) return resolve();
		const err = Error(`${command} exited with ${signal ?? code}`);
		err.code = code;
		err.signal = signal;
		reject(err);
	});
});

export class NetSocket {
    constructor(port, host) {

        this.socket = new Socket();
        this.port = port;
        this.host = host;
        this.listeners = {
            connect: undefined, timeout: undefined, error: undefined, close: undefined
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
export const uid = OS.userInfo().uid;
export const hostname = OS.hostname();// 'localhost.localdomain';
export const tempdir = OS.tmpdir();// '/tmp'
export const homedir = OS.homedir();

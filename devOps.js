exports.localhost = '127.0.0.1';
const os = require('os');
exports.hostname = os.hostname;
exports.tempdir = os.tmpdir();
exports.homedir = os.homedir();
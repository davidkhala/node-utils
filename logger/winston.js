const winston = require('winston');
const levels = [
	'error',
	'warn',
	'info',
	'verbose',
	'debug',
	'silly'
];
const localDateCallback = () => {
	const date = new Date();
	return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000).toISOString();
};

/**
 * If you do not explicitly define the levels that winston should use the npm levels.https://www.npmjs.com/package/winston#logging-levels
 * @param {string} moduleName
 * @param {number} level default 4:'debug'
 * @param {function} [timestampCallback]
 * @return {winston.LoggerInstance}
 */
exports.new = (moduleName, level = 4, timestampCallback) => {
	const timestamp = typeof timestampCallback === 'function' ? timestampCallback : () => new Date().toISOString();
	return new (winston.Logger)({
		transports: [
			new (winston.transports.Console)({
				level: levels[level],
				colorize: true,
				label: moduleName,
				timestamp,
				prettyPrint: true
			})
		]
	});
};
/**
 *
 * @param {string} moduleName
 * @param {string} logFile
 * @param {number} level default 4:'debug'
 * @param {function} [timestampCallback]
 * @return {winston.LoggerInstance}
 */
exports.newFile = (moduleName, logFile, level = 4, timestampCallback) => {
	const timestamp = typeof timestampCallback === 'function' ? timestampCallback : () => new Date().toISOString();
	return new (winston.Logger)({
		transports: [
			new (winston.transports.File)({
				// property name: https://github.com/winstonjs/winston/tree/2.x#multiple-transports-of-the-same-type
				level: levels[level],
				label: moduleName,
				filename: logFile,
				timestamp,
				json: false,
				colorize: false
			})
		]
	});
};
exports.localDateCallback = localDateCallback;
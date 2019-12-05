const winston = require('winston');
const levels = [
	'error',
	'warn',
	'info',
	'verbose',
	'debug',
	'silly'
];
/**
 *
 * @param {string} moduleName
 * @param {number} level default 4:'debug'
 * @return {winston.LoggerInstance}
 */
exports.new = (moduleName, level = 4) => {
	//If you do not explicitly define the levels that winston should use the npm levels.https://www.npmjs.com/package/winston#logging-levels

	return new (winston.Logger)({
		transports: [
			new (winston.transports.Console)({
				level: levels[level],
				colorize: true,
				label: moduleName,
				timestamp: true,
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
 * @return {winston.LoggerInstance}
 */
exports.newFile = (moduleName, logFile, level = 4) => {
	return new (winston.Logger)({
		transports: [
			new (winston.transports.File)({
				//property name: https://github.com/winstonjs/winston/tree/2.x#multiple-transports-of-the-same-type
				level: levels[level],
				label: moduleName,
				filename: logFile,
				timestamp: true,
				json: false,
				colorize: false
			})
		]
	});
};
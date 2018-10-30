const winston = require('winston');
/**
 *
 * @param moduleName
 * @returns {*} console logger
 */
exports.new = (moduleName) => {
	return new (winston.Logger)({
		transports: [
			new (winston.transports.Console)({
				level: 'debug',
				colorize: true,
				label: moduleName,
				timestamp: true,
			})
		]
	});
};
exports.newFile = (moduleName, logFile) => {
	return new (winston.Logger)({
		transports: [
			new (winston.transports.File)({
				//property name: https://github.com/winstonjs/winston/tree/2.x#multiple-transports-of-the-same-type
				level: 'debug',
				label: moduleName,
				filename: logFile,
				timestamp: true,
				json: false,
				colorize: false
			})
		]
	});
};
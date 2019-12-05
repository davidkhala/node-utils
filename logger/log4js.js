const levels = [
	'OFF',  // nothing is logged
	'FATAL', // fatal errors are logged
	'ERROR', // errors are logged
	'WARN',	// warnings are logged
	'INFO',	// infos are logged
	'DEBUG', // debug infos are logged
	'TRACE', // traces are logged
	'ALL'	// everything is logged
];
/**
 *
 * @param {string} moduleName
 * @param {number} level refer to `Log4j.levels` default 5:'debug'
 * @return {Logger}
 */
exports.consoleLogger = (moduleName, level = 5) => {
	const Log4js = require('log4js');
	const logger = Log4js.getLogger(moduleName);

	logger.level = levels[level];
	return logger;
};

exports.fileLogger = (moduleName, filename, level = 5) => {
	const Log4js = require('log4js');
	Log4js.configure({
		appenders: {[moduleName]: {type: 'file', filename}},
		categories: {default: {appenders: [moduleName], level: levels[level]}}
	});
	return Log4js.getLogger(moduleName);
};



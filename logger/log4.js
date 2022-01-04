import Log4js from 'log4js';

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
export const consoleLogger = (moduleName, level = 5) => {

	const logger = Log4js.getLogger(moduleName);

	logger.level = levels[level];
	return logger;
};

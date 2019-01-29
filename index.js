module.exports = {
	baseApp: () => require('./baseApp'),
	devOps: () => require('./devOps'),
	helper: () => require('./helper'),
	logger: () => require('./logger'),
	random: () => require('./random'),
	request: () => require('./request'),
	yaml: () => require('./yaml'),
	version: () => require('./version'),
	/**
	 *
	 * @param {string} moduleName
	 * @param {number} level refer to `Log4j.levels` default 5:'debug'
	 * @return {Logger}
	 */
	devLogger: (moduleName, level = 5) => {
		const Log4j = require('log4js');//dependencies not provided
		const logger = Log4j.getLogger(moduleName);

		const levels = [
			'OFF',  //nothing is logged
			'FATAL',//fatal errors are logged
			'ERROR',//errors are logged
			'WARN',	//warnings are logged
			'INFO',	//infos are logged
			'DEBUG',//debug infos are logged
			'TRACE',//traces are logged
			'ALL'	//everything is logged
		];
		logger.level = levels[level];
		return logger;
	}
};
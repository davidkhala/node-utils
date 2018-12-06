const Log4j = require('log4js');
exports.devLogger = (moduleName) => {
	const logger = Log4j.getLogger(moduleName);
	logger.level = 'debug';
	return logger;
};

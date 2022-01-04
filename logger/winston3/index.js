import {createLogger, format, transports} from 'winston';
const {combine, timestamp} = format;
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
 * @return {winston.Logger}
 */
export const consoleLogger = (moduleName, level = 4) => {
	return createLogger({
		level: levels[level],

		format: combine(
			format.label({label: moduleName}),
			timestamp(),
			format.prettyPrint()
		),
		transports: [
			new transports.Console(),
		]
	});
};


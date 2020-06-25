const MySQL = require('../Mysql');
const logger = require('khala-logger/log4js').consoleLogger('test:SQL');
exports.mysql = new MySQL('database', 'root', 'password', logger);
const dataObjects = require('./dataObjects');
exports.setup = async (mysql) => {
	const result = {};
	for (const [key, value] of Object.entries(dataObjects)) {
		const model = mysql.setModel(key, value);
		await mysql.sync(true);
		result[key] = model;
	}
	return result;

};

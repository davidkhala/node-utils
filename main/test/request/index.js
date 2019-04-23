const logger = require('../..').devLogger('test:request');
const {ping} = require('../../request');

const taskPing = async () => {
	const resp = await ping('https://localhost');
	logger.info(resp);
};
const task = async () => {
	await taskPing();
};
task();
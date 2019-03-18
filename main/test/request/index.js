const logger = require('../..').devLogger('test:request');
const {ping} = require('../../request');

const path = require('path');
const taskPing = async () => {
	const resp = await ping('https://localhost');
	logger.info(resp);
};
const taskCert = async () => {
	const url = 'https://superagent.bluecross.com.hk/medservice/api/submitopclaim';

	const cert = path.resolve(__dirname, 'superagentbluecrosscomhk.crt');
	try {
		await ping(url);
		logger.error('assert failure: certificate should be required');
	} catch (e) {
		logger.info('expected error: certificate should be required');
	}
	const resp = await ping(url, {cert});

	logger.info(url, resp);

};
const task = async () => {
	await taskCert();
};
task();
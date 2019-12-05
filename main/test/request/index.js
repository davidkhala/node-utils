const logger = require('khala-logger/log4js').consoleLogger('test:request');
const {ping, RequestPromise} = require('../../request');
const path = require('path');
const taskPing = async () => {
	const resp = await ping('https://localhost');
	logger.info(resp);
};
const task = async () => {
	await taskPing();
};


const {fsExtra} = require('../../helper');
const taskFormData = async () => {
	const filePath = path.resolve(__dirname, 'web_ic_hyperledger.png');
	const formData = {
		files: [fsExtra.createReadStream(filePath)]
	};
	const resp = await RequestPromise({
		url: 'http://localhost:3000/formData/',
		formData,
		method: 'post'
	});
	console.log(resp);

};
taskFormData();

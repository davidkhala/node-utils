const logger = require('./logger').new('ServerClient');
const Request = require('request');
exports.RequestPromise = ({url, body, method = 'POST', formData}, otherOptions = {json: true}) => {
	return new Promise((resolve, reject) => {
		const opts = Object.assign(otherOptions, {
			method,
			url,
			body,
		});
		if (formData) {
			opts.formData = formData;
		}
		Request(opts, (err, resp, body) => {
			if (err) reject(err);
			resolve(body);
		});
	});
};

//TODO have not cover all API yet
exports.ping = async (serverBaseUrl) => {
	const retryMax = 5;
	let retryCounter = 0;
	const aTry = () => new Promise((resolve, reject) => {
		exports.RequestPromise({
			url: `${serverBaseUrl}/`,
			method: 'GET'
		}).then(body => resolve(body)).catch(err => {
			if (err.code === 'ECONNREFUSED' && retryCounter < retryMax) {
				logger.warn('ping retry', retryCounter);
				setTimeout(() => {
					retryCounter++;
					resolve(aTry());
				}, 200);
			} else reject(err);
		});
	});
	return aTry();

};
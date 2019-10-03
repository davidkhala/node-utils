const logger = require('khala-logger').new('ServerClient');
const Request = require('request');
const {sleep} = require('./helper');
const {isPath} = require('./format');
const fs = require('fs');
//formData: multipart/form-data
exports.RequestPromise = async ({url, body, method = 'POST', formData}, otherOptions = {json: true}) => {
	return new Promise((resolve, reject) => {
		const opts = Object.assign(otherOptions, {
			method,
			url,
			body
		});
		if (formData) {
			opts.formData = formData;
		}
		Request(opts, (err, resp, body) => {
			if (err) reject(err);
			const {statusCode, statusMessage} = resp;
			if (statusCode >= 400) {
				reject({statusCode, statusMessage, resp, body});
			} else if (statusCode !== 200) {
				logger.debug({url, statusCode, statusMessage});
			}
			resolve(body);
		});
	});
};

exports.ping = async (serverBaseUrl, otherOptions = {}, timeInterval = 200, retryMax = 5) => {
	let retryCounter = 0;

	const {cert, key, ca, rejectUnauthorized} = otherOptions;
	otherOptions.rejectUnauthorized = rejectUnauthorized ? rejectUnauthorized : false;
	otherOptions.cert = isPath(cert) ? fs.readFileSync(cert) : cert;
	otherOptions.key = isPath(key) ? fs.readFileSync(key) : key;
	otherOptions.ca = isPath(ca) ? fs.readFileSync(ca) : ca;

	const aTry = async () => {
		try {
			return await exports.RequestPromise({url: `${serverBaseUrl}/`, method: 'GET'}, otherOptions);
		} catch (err) {
			if (err.code === 'ECONNREFUSED' && retryCounter < retryMax) {
				retryCounter++;
				logger.warn(`ping retry: ${retryCounter} of ${retryMax}`);
				await sleep(timeInterval);
				return aTry();
			} else throw err;
		}

	};
	return aTry();

};

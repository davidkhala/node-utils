const axios = require('axios');
const https = require('https');
const fs = require('fs');

/**
 * @typedef {Object} TLSExtraOptions
 * @property {string} [cert] client cert path
 * @property {string} [key] client key path
 * @property {string} [ca] rootCa cert path
 * @property {boolean} [rejectUnauthorized]
 * @property [passphrase]
 */

/**
 * responseType: 'json', // default
 * @typedef {TLSExtraOptions} RequestExtraOptions
 * @property [auth] Please note that only HTTP Basic auth is configurable
 */


/**
 *
 * @param url
 * @param {Object} [body]
 * @param [method]
 * @param {FormData} [formData]
 * @param {RequestExtraOptions} [otherOptions]
 * @return {Promise<Object>}
 */
exports.axiosPromise = async ({url, body, method = 'POST', formData}, otherOptions = {}) => {

	const {cert, key, ca, rejectUnauthorized, passphrase} = otherOptions;
	if (cert || key || ca || passphrase || typeof rejectUnauthorized === 'boolean') {
		otherOptions.httpsAgent = new https.Agent({
			rejectUnauthorized, passphrase,
			cert: cert ? fs.readFileSync(cert) : undefined,
			key: key ? fs.readFileSync(key) : undefined,
			ca: ca ? fs.readFileSync(ca) : undefined
		});
	}
	const {auth} = otherOptions;
	if (auth) {
		// Please note that only HTTP Basic auth is configurable through Axios config.auth.
		const {bearer, username, password} = auth;
		if (!username || !password) {
			if (bearer) {
				otherOptions.headers = Object.assign({Authorization: `Bearer ${bearer}`}, otherOptions.headers);
			}
			delete otherOptions.auth;
		}
	}

	const config = Object.assign({
		method,
		url
	}, otherOptions);
	if (formData) {
		config.headers = Object.assign(formData.getHeaders(), config.headers);
		config.data = formData;
	} else {
		config.data = body;
	}

	try {
		const {data} = await axios.request(config);
		return data;
	} catch (e) {
		delete e.request;
		const {response} = e;
		if (response) {
			const {status, statusText} = response;
			e.statusCode = status;
			e.statusMessage = statusText;
		}
		throw e;
	}

};

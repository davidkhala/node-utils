const axios = require('axios');
/**
 *
 * @param url
 * @param {Object} [body]
 * @param [method]
 * @param {FormData} [formData]
 * @param [otherOptions]
 * @return {Promise<T>}
 */
exports.axiosPromise = async ({url, body, method = 'POST', formData}, otherOptions = {}) => {

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

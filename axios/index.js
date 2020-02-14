const axios = require('axios');
exports.axiosPromise = async ({url, body, method = 'POST', formData}, otherOptions = {}) => {
	const config = Object.assign({
		method,
		url,
		data: body,
		formData
	}, otherOptions);
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

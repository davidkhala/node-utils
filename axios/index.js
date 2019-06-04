const axios = require('axios');
exports.axiosPromise = async ({url, body, method = 'POST', formData}, otherOptions = {responseType: 'json'}) => {
	const config = Object.assign({
		method,
		url,
		data: body,
		formData
	}, otherOptions);
	const {data} = await axios.request(config);
	return data;
};

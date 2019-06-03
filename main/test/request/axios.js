const axios = require('axios');
const request = require('../../request');
const task = async () => {
	const resp = await axios.get('http://localhost:3000');
	console.log(resp.data);
};
const taskHttpsPost = async () => {
	const https = require('https');
	const resp = await request.axiosPromise({
		url: 'https://localhost:3000/post',
		body: {mcc: 'david'},
		method: 'post'
	}, {
		httpsAgent: new https.Agent({
			rejectUnauthorized: false
		})
	});

	console.log(resp);
};

const taskFormData = async () => {
	const fs = require('fs');
	const formData = {
		// Pass multiple values /w an Array
		attachments: [
			fs.createReadStream(__dirname + '/web_ic_hyperledger.png')

		],
	};
	const resp = await request.axiosPromise()
};
taskHttpsPost();



const {axiosPromise} = require('../index');
const task = async () => {
	const resp = await axiosPromise({url: 'http://localhost:3000'});
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

	const FormData = require('form-data');

	const form = new FormData();
	form.append('file', fs.createReadStream(__dirname + '/web_ic_hyperledger.png'));

	const resp = await request.axiosPromise({
		url: 'http://localhost:3000/formData/file',
		body: form,
		method: 'post'
	}, {
		headers: form.getHeaders()
	});
	console.log(resp);
};
taskFormData();



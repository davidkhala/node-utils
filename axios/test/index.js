const {axiosPromise} = require('../index');
const logger = require('khala-logger/log4js').consoleLogger('test:axios');

const task = async () => {
	const url = 'http://localhost:3000';
	switch (parseInt(process.env.taskID)) {
		case 0: {
			const https = require('https');
			const resp = await axiosPromise({
				url: 'https://localhost:3000/post',
				body: {mcc: 'david'},
				method: 'post'
			}, {
				httpsAgent: new https.Agent({
					rejectUnauthorized: false
				})
			});

			console.log(resp);
		}
			break;
		case 1: {
			const fs = require('fs');

			const FormData = require('form-data');

			const form = new FormData();
			form.append('files', fs.createReadStream(__dirname + '/web_ic_hyperledger.png'));

			const resp = await axiosPromise({
				url: 'http://localhost:3000/formData',
				body: form,
				method: 'post'
			}, {
				headers: form.getHeaders()
			});
			console.log(resp);
		}
			break;
		default: {
			try {
				const resp = await axiosPromise({url, method: 'GET'});
				logger.info(resp);
			} catch (e) {
				logger.error(e);
			}

		}
	}

};

task();




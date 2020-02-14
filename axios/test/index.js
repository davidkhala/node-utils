const {axiosPromise} = require('../index');
const logger = require('khala-logger/log4js').consoleLogger('test:axios');

const task = async () => {
	const url = 'http://localhost:3000';
	const tlsUrl = 'https://localhost:3443';
	switch (parseInt(process.env.taskID)) {
		case 0: {
			// taskID=0 node test # url-encoded https post case
			const resp = await axiosPromise({
				url: `${tlsUrl}/post`,
				body: {mcc: 'david'}
			}, {
				rejectUnauthorized: false
			});

			console.log(resp);
		}
			break;
		case 1: {
			// taskID=1 node test # formData case
			const fs = require('fs');
			const FormData = require('form-data');

			const form = new FormData();
			form.append('files', fs.createReadStream(__dirname + '/web_ic_hyperledger.png'));

			const resp = await axiosPromise({
				url: `${url}/formData`,
				formData: form
			});
			logger.info(resp);
		}
			break;
		case 2: {
			// taskID=2 node test # url-encoded post case
			const resp = await axiosPromise({
				url: `${url}/post`,
				body: {a: 'b'}
			});
			logger.info(resp);
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




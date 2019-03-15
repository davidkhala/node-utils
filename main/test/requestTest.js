const {ping} = require('../request');

const task = async () => {
	const resp = await ping('https://localhost');
	console.log(resp);
};
task();
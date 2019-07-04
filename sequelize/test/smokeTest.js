const {MySQL} = require('../');
const flow = async () => {
	const mysql = new MySQL('database', 'root', 'password');
	await mysql.connect();
	await mysql.close();
	console.log('test: then silent');
	await mysql.connect(true);
	await mysql.close();
};
flow();

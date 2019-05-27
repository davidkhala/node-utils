const {MySQL} = require('../');
const flow = async () => {
	const mysql = new MySQL('database', 'root', 'password');
	await mysql.connect();
	await mysql.close();
};
flow();

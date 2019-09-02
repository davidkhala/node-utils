const MySQL = require('../Mysql');
const {User} = require('./dataObjects');
const flow = async () => {
	const mysql = new MySQL('database', 'root', 'password');
	await mysql.connect();
	await mysql.close();
	console.log('test: then silent');
	await mysql.connect(true);

	const user = mysql.setModel('User', User);
	await mysql.sync();
	const rows = await MySQL.ORM.list(user);
	console.log(rows);
	await mysql.close();

};
flow();

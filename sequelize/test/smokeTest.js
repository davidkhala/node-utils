const MySQL = require('../Mysql');
const {User} = require('./dataObjects');
const {mysql, setup} = require('./_connection');
const flow = async () => {
	await mysql.connect();
	await mysql.close();
	console.log('test: then silent');
	await mysql.connect(true);
	const models = await setup(mysql);
	const user = models.User;
	const rows = await MySQL.ORM.list(user);
	console.log(rows);
	await mysql.close();

};
flow();

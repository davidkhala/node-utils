const {MySQL} = require('khala-sequelize');
const {sleep} = require('./testUtil');
const database = 'database';
const user = 'root';
const password = 'password';

const mysql = new MySQL(database, user, password);

const task = async () => {
	await mysql.connect(true);
	await sleep(2000);
	await mysql.close();
};
task();

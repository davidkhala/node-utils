const {mysql, setup} = require('./_connection');
const dropAllTableTest = async () => {
	await mysql.dropAllTables();
	await showAllTables();
};
const dropDatabase = async (database) => {
	await mysql.dropDatabase(database);
};
const dropTable = async (table) => {
	await mysql.dropSchema(table);
	await showAllTables();
};
const showAllTables = async () => {
	const result = await mysql.showAllSchemas();
	console.log(result);
};

const run = async (callback, ...args) => {
	await mysql.connect(true);
	await setup(mysql);
	await callback(...args);
	await mysql.close();
};
const task = async () => {
	await run(showAllTables);
	await run(dropAllTableTest);
	await run(dropDatabase, 'database');
	await run(dropTable, 'User');
};
task();

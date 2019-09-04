const {mysql, setup} = require('./_connection');
const dropTableTest = async () => {
	await mysql.dropAllTables();

};

const run = async (callback) => {
	await mysql.connect(true);
	await setup(mysql);
	await callback();
	await mysql.close();
};
const task = async () => {
	await run(dropTableTest)
};
task();
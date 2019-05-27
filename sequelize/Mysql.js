const Sequelize = require('sequelize');

class MySQL {

	constructor(database, username = 'root', password = '', logger = console.log) {
		this.database = database;
		this.username = username;
		this.password = password;
		this.logger = logger;
	}

	static _createConnection(database, username, password, logging = false) {
		return new Sequelize(database, username, password,
			{
				logging,
				host: 'localhost',
				dialect: 'mysql',
				pool: {
					max: 200,
					min: 0,
					idle: 10000
				}
			}
		);
	}

	async close() {
		await this.connection.close();
		delete this.connection;
	}

	/**
	 * the table name will be `${modelName}s`
	 * @returns {Promise<void>}
	 */
	async sync() {
		await this.connection.sync();
	}

	async dropAllTables() {
		this.logger.warn('dropAllTables');
		await this.connection.queryInterface.dropAllTables();
	}

	async addColumn(table, column, type) {
		await this.connection.queryInterface.addColumn(table, column, type);
	}

	async connect(silence) {
		const logger = silence ? false : this.logger;
		if (!this.connection) {
			this.connection = MySQL._createConnection(this.database, this.username, this.password, logger);
		}
		try {
			await this.connection.query('show databases;');
		} catch (e) {
			const {name, original} = e;
			if (name === 'SequelizeConnectionError' && original.sqlMessage.includes('Unknown database')) {
				this.logger.warn(original.sqlMessage, 'creating');
				const emptyConnection = MySQL._createConnection('', this.username, this.password, logger);
				await emptyConnection.query(`CREATE DATABASE IF NOT EXISTS \`${this.database}\`;`);
				await emptyConnection.close();
				this.logger.warn(original.sqlMessage, 'created');
			} else {
				throw e;
			}
		}

	}

	async setIDBias(tableName, bias) {
		await this.connection.query(`ALTER TABLE \`${tableName}\` AUTO_INCREMENT = ${bias};`);
	}

	setModel(tagName, model, opts) {
		return this.connection.define(tagName, model, opts);
	}

	getModel(tagName) {
		return this.connection.modelManager.getModel(tagName);
	}

	listModels() {
		return this.connection.modelManager.all;
	}
}

MySQL.DataTypes = Sequelize.DataTypes;
const dataTypes = {
	string: Sequelize.DataTypes.STRING,
	object: Sequelize.DataTypes.JSON,
	number: Sequelize.DataTypes.FLOAT,
	boolean: Sequelize.DataTypes.BOOLEAN
};

MySQL.modelOf = (obj) => {
	const result = {};
	for (const key in obj) {
		result.key = dataTypes[typeof key];
	}
	return result;
};
MySQL.Op = Sequelize.Op;

MySQL.ORM = {
	list: async (model, filter = {}) => {
		const all = await model.findAll({
			where: filter
		});
		return all;
	},
	deleteAll: async (model) => {
		await model.destroy({
			where: {}
		});
	},
	findByPrimary: async (model, primary) => {
		return model.findByPk(primary);
	},
	update: async (obj, diff) => {
		await obj.update(diff);
	},
	insert: async (model, data) => {
		await model.create(data);
	},
	count: async (model) => {
		return await model.count();
	},
	lastID: async (model) => {
		return await model.max('id');
	}
};
module.exports = MySQL;


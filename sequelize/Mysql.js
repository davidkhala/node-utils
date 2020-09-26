const Sequelize = require('sequelize');

class MySQL {

	constructor(connectOpts, logger = console) {
		const {username = 'root', password = '', host = 'localhost', port = 3306} = connectOpts;
		Object.assign(this, {username, password, host, port});
		this.logger = logger;
	}

	_createConnection(database, logging = false) {
		const {username, password, host, port} = this;
		return new Sequelize(database, username, password,
			{
				logging,
				host,
				port,
				dialect: 'mysql',
				pool: {
					max: 200,
					min: 0,
					idle: 10000
				},
				timestamps: false,
				define: {
					charset: 'utf8',
					freezeTableName: true // prevent sequelize from pluralizing table names
				}
			}
		);
	}

	async close() {
		await this.connection.close();
		delete this.connection;
	}

	/**
	 * create table
	 * @param {boolean} [refresh] if truthy, drop existing database before creation
	 * @returns {Promise<void>}
	 */
	async sync(refresh) {
		await this.connection.sync({force: !!refresh});
	}

	async dropTable(tableName) {
		this.logger.warn(`dropTable[${tableName}]`);
		await this.connection.queryInterface.dropTable(tableName);
	}

	async dropAllTables() {
		this.logger.warn('dropAllTables');
		await this.connection.queryInterface.dropAllTables();
	}

	async dropDatabase(database) {
		this.logger.warn(`dropDatabase[${database}]`);
		await this.connection.queryInterface.dropDatabase(database);
	}

	async dropSchema(schema) {
		this.logger.warn(`dropSchema[${schema}]`);
		if (this.connection.options.dialect === 'mysql') {
			this.logger.warn(`sequelize:dropSchema in dialect[mysql] => dropTable[${schema}]`);
		}
		await this.connection.queryInterface.dropSchema(schema);
	}

	async showAllSchemas() {
		const result = await this.connection.queryInterface.showAllSchemas();
		if (this.connection.options.dialect === 'mysql') {
			this.logger.debug('sequelize::showAllSchemas in dialect[mysql] => show all `Tables_in_database` ');
			return result.map(e => e.Tables_in_database);
		}
		return result;
	}

	async dropAllSchemas() {
		this.logger.warn('dropAllSchemas');
		await this.connection.queryInterface.dropAllSchemas();
	}

	async addColumn(table, column, type) {
		await this.connection.queryInterface.addColumn(table, column, type);
	}

	async ping() {
		try {
			await this.connection.authenticate();
			return true;
		} catch (e) {
			this.logger.error(e);
			return false;
		}
	}

	async connect(database, silence) {
		const logger = silence ? false : this.logger.debug.bind(this.logger);
		if (!this.connection) {
			this.connection = this._createConnection(database, logger);
		}
		try {
			await this.connection.query('show databases;');
		} catch (e) {
			const {name, original} = e;
			if (name === 'SequelizeConnectionError' && original.sqlMessage && original.sqlMessage.includes('Unknown database')) {
				this.logger.warn(original.sqlMessage, 'creating');
				const emptyConnection = this._createConnection('', logger);
				await emptyConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
				await emptyConnection.close();
				this.logger.warn(original.sqlMessage, 'created');
			} else {
				throw e;
			}
		}

	}

	// TODO move it out as it limited to mysql
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
MySQL.DataTypes.TIMESTAMP = 'TIMESTAMP'; // no any match for mysql dataType:TIMESTAMP
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


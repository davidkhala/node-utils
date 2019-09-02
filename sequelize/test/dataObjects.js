/**
 * Sample data objects
 */
const {DataTypes} = require('../Mysql');
exports.User = {
	ID: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	Name: DataTypes.STRING,
	Detail: DataTypes.JSON,
	Fee: DataTypes.FLOAT,
	Role: DataTypes.ENUM('client', 'admin'),
	Status: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	},
	counter: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	}
};

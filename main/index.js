module.exports = {
	baseApp: require('./baseApp'),
	devOps: require('./devOps'),
	helper: require('./helper'),
	random: require('./random'),
	yaml: require('./yaml'),
	version: require('./version'),
	format: require('./format'),
	syntax: require('./syntax'),
	useBlueBird: () => {
		global.Promise = require('bluebird');
	}

};

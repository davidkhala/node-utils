const Tmp = require('tmp');
Tmp.setGracefulCleanup();


/**
 *
 * @param options
 * @return {[string, function(...[*]=)]} return a fileName, and a cleanup callback
 */
const createTmpFile = (options) => {
	const obj = Tmp.fileSync(options);
	return [obj.name, () => {
		obj.removeCallback();
	}];
};
/**
 *
 * @param options
 * @return {[string, function(...[*]=)]}
 */
const createTmpDir = (options) => {
	const obj = Tmp.dirSync(options);
	return [obj.name, () => {
		obj.removeCallback();
	}];
};


module.exports = {
	createTmpFile,
	createTmpDir
};
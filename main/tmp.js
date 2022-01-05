import Tmp from 'tmp';
Tmp.setGracefulCleanup();


/**
 *
 * @param [options]
 * @return {[string, function(...[*]=)]} return a fileName, and a cleanup callback
 */
export const createTmpFile = (options) => {
	const obj = Tmp.fileSync(options);
	return [obj.name, () => {
		obj.removeCallback();
	}];
};
/**
 *
 * @param {Options} [options]
 * @return {[string, function(...[*]=)]}
 */
export const createTmpDir = (options = {unsafeCleanup: true}) => {
	const obj = Tmp.dirSync(options);
	return [obj.name, () => {
		obj.removeCallback();
	}];
};

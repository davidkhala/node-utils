exports.repeat = (len, dummy) => {
	return new Array(len).fill(dummy);
};
exports.unique = (arr) => {
	return [...new Set(arr)];
};
/**
 *
 * @param {string} str
 * @return {string[]}
 */
exports.splitBySpace = (str) => {
	return str.trim().split(/\b\s+/);
};
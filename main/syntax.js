exports.repeat = (len, dummy) => {
	return new Array(len).fill(dummy);
};
exports.unique = (arr) => {
	return [...new Set(arr)];
};

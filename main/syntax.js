module.exports = {
	repeat:(len, dummy) => {
		return new Array(len).fill(dummy);
	},
	unique:(arr) => {
		return [...new Set(arr)];
	}
};

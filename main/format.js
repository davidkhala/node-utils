exports.JSONReadable = (data) => JSON.stringify(data, null, 2);
const dateFormatter = require('date-format');
const path = require('path');
exports.dateFormat = (format, date) => {
	return dateFormatter(format, date);
};

exports.isPath = (str) => {
	return !!str && !(str === path.basename(str));
};
/**
 * nodejs version of ItoRunes
 * @param {number} i integer
 * @param {string} namespace
 * @returns {string}
 */
exports.int2Chars = (i, namespace) => {
	i = parseInt(i);
	const d = namespace.length;
	const forward = (intNum) => {
		const rest = Math.floor(intNum / d);
		const mod = intNum % d;
		return {rest, mod};
	};
	let {rest, mod} = forward(i);
	let result = namespace[mod];
	while (rest > 0) {
		const temp = forward(rest);
		rest = temp.rest;
		mod = temp.mod;
		result = mod + result;
	}
	return result;
};
exports.chars2Hex = (str) => {
	return Buffer.from(str).toString('hex');
};
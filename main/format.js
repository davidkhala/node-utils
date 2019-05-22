exports.JSONReadable = (data) => JSON.stringify(data, null, 2);
const dateFormatter = require('date-format');
const path = require('path');
exports.dateFormat = (format, date) => {
	return dateFormatter(format, date);
};
/**
 *
 * @type {number} a year in millisecond
 */
exports.year = 31556926000;
exports.base64 = {
	encode: (data) => {
		return Buffer.from(data).toString('base64');
	},
	decode: (data) => {
		return Buffer.from(data, 'base64').toString();
	}
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
exports.bytes2String = (bytes) => {
	return Buffer.from(bytes).toString();
};
exports.chars2Hex = (str) => {
	return Buffer.from(str).toString('hex');
};

exports.RegxMatch = (str, pattern, flags) => {
	const namePattern = new RegExp(pattern, flags);
	return str.match(namePattern);
};
exports.isFloat = (number) => {
	if (typeof number !== 'number') {
		return false;
	}
	if (Number.isInteger(number)) {
		return false;
	}
	return true;
};

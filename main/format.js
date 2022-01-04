import dateFormatter from 'date-format';
import path from 'path';

export const JSONReadable = (data) => JSON.stringify(data, null, 2);
export const dateFormat = dateFormatter;
/**
 *
 * @type {number} a year in millisecond
 */
export const year = 31556926000;
export const base64 = {
	encode: (data) => {
		return Buffer.from(data).toString('base64');
	},
	decode: (data) => {
		return Buffer.from(data, 'base64').toString();
	}
};
export const isPath = (str) => {
	return !!str && !(str === path.basename(str));
};
/**
 * nodejs version of ItoRunes
 * @param {number} i integer
 * @param {string} namespace
 * @returns {string}
 */
export const int2Chars = (i, namespace) => {
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
export const bytes2String = (bytes) => {
	return Buffer.from(bytes).toString();
};
export const chars2Hex = (str) => {
	return Buffer.from(str).toString('hex');
};


export const RegxMatch = (str, pattern, flags) => {
	const namePattern = new RegExp(pattern, flags);
	return str.match(namePattern);
};
export const isFloat = (number) => typeof number === 'number' && !Number.isInteger(number);


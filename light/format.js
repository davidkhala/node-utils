import util from 'util';
import {createHash} from 'node:crypto';

export const JSONReadable = (data) => JSON.stringify(data, null, 2);
export const ObjectReadable = (object) => util.inspect(object, {
	depth: Infinity
});


export function md5(content) {
	return createHash('md5').update(content).digest('hex');
}

export const base64 = {
	encode: (data) => Buffer.from(data).toString('base64'),
	decode: (data) => Buffer.from(data, 'base64').toString()
};

/**
 * nodejs version of ItoRunes
 * @param {number} i integer
 * @param {string} namespace
 * @returns {string}
 */
export function int2Chars(i, namespace) {
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
}

export const bytes2String = (bytes) => Buffer.from(bytes).toString();

export const hex2chars = (hexString) => Buffer.from(hexString, 'hex').toString();

export const chars2Hex = (str) => Buffer.from(str).toString('hex');

/**
 *
 * @param {Uint8Array} array
 * @return {string}
 */
export const Uint8Array2String = (array) => array.toString();
/**
 *
 * @param {string} str comma split string
 * @return {Uint8Array}
 */
export const String2Uint8Array = (str) => Uint8Array.from(str.split(','));





export const JSONReadable = (data) => JSON.stringify(data, null, 2);

export const base64 = {
	encode: (data) => {
		return Buffer.from(data).toString('base64');
	},
	decode: (data) => {
		return Buffer.from(data, 'base64').toString();
	}
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
export const bytes2String = (bytes) => Buffer.from(bytes).toString();

export const chars2Hex = (str) => {
	return Buffer.from(str).toString('hex');
};
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





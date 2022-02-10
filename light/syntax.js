export const repeat = (len, dummy) => new Array(len).fill(dummy);
export const unique = (arr) => [...new Set(arr)];
export const isFloat = (number) => typeof number === 'number' && !Number.isInteger(number);
/**
 *
 * @param {string} str
 * @return {string[]}
 */
export const splitBySpace = (str) => str.trim().split(/\b\s+/);

export const isArrayEven = arr => {
	return Array.isArray(arr) && arr.length > 0 && arr.every(v => JSON.stringify(v) === JSON.stringify(arr[0]));
};

export const RegXMatch = (str, pattern, flags) => str.match(new RegExp(pattern, flags));
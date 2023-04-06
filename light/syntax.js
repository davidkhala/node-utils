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

export const removeUndefinedValues = (object, recursive, clone) => {
	const cloned = {};
	for (const [key, value] of Object.entries(object)) {
		const valueType = typeof value;
		if (clone) {
			if (value && recursive && valueType === 'object') {
				cloned[key] = removeUndefinedValues(value, recursive, clone);
			} else {
				if (valueType !== 'undefined') {
					cloned[key] = value;
				}
			}
		} else {
			if (!value && valueType === 'undefined') {
				delete object[key];
			} else if (recursive && valueType === 'object') {
				object[key] = removeUndefinedValues(value, recursive, clone);
			}
		}
	}
	if (clone) {
		return cloned;
	} else {
		return object;
	}

};

export function getClassSimpleName(object) {
	return object.constructor.name;
}

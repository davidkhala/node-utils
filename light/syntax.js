export const isFloat = (number) => typeof number === 'number' && !Number.isInteger(number);
/**
 *
 * @param {string} str
 * @return {string[]}
 */
export const splitBySpace = (str) => str.trim().split(/\b\s+/);


export function removeUndefinedValues(object, recursive, clone) {
	if (clone) {
		const cloned = {};
		for (const [key, value] of Object.entries(object)) {
			const valueType = typeof value;
			if (value && recursive && valueType === 'object') {
				cloned[key] = removeUndefinedValues(value, recursive, clone);
			} else if (valueType !== 'undefined') {
				cloned[key] = value;
			}
		}
		return cloned;
	}

	for (const [key, value] of Object.entries(object)) {
		const valueType = typeof value;

		if (!value && valueType === 'undefined') {
			delete object[key];
		} else if (recursive && valueType === 'object') {
			object[key] = removeUndefinedValues(value, recursive, clone);
		}

	}
	return object;


}

export const getClassSimpleName = (object) => object.constructor.name;

export function findIndexesOf(str, pattern, from = 0) {
	let index = str.indexOf(pattern, from);
	const result = [];
	while (index !== -1) {
		result.push(index);
		index = str.indexOf(pattern, from + index + 1);
	}
	return result.length ? result : undefined;
}

export function isCommentOnly(str) {

	const commentStart = str.indexOf('/*');
	const commentEnd = str.indexOf('*/', commentStart);
	return commentEnd - commentStart + 2 === str.length;
}


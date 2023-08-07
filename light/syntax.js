export const isFloat = (number) => typeof number === 'number' && !Number.isInteger(number);
/**
 *
 * @param {string} str
 * @return {string[]}
 */
export const splitBySpace = (str) => str.trim().split(/\b\s+/);


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

export const getClassSimpleName = (object) => object.constructor.name;

export const findIndexOf = (str, pattern, from = 0) => {
	const index = str.indexOf(pattern, from);
	return index < 0 ? undefined : index;
};


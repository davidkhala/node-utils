export const repeat = (len, value) => new Array(len).fill(value);

export const unique = (arr) => [...new Set(arr)];
export const isEven = arr => {
	return Array.isArray(arr) && arr.length > 0 && arr.every(v => JSON.stringify(v) === JSON.stringify(arr[0]));
};

export const union = (...arrayList) => unique(arrayList.reduce((sum, array) => sum.concat(array), []));

export const minus = (minuend, subtrahend) => minuend.filter(x => !subtrahend.includes(x));
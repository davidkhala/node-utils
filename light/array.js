import util from 'util';

export const repeat = (len, value) => new Array(len).fill(value);

export const unique = (arr) => [...new Set(arr)];
export const isEven = arr => Array.isArray(arr) && arr.length > 0 && arr.every(v => util.isDeepStrictEqual(v, arr[0]));


export const union = (...arrayList) => unique(arrayList.reduce((sum, array) => sum.concat(array), []));

export const minus = (minuend, subtrahend) => minuend.filter(x => !subtrahend.includes(x));

export const intersection = (arr1, arr2) => arr1.filter(x => arr2.includes(x));
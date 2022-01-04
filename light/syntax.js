export const repeat = (len, dummy) => new Array(len).fill(dummy);
export const unique = (arr) => [...new Set(arr)];

/**
 *
 * @param {string} str
 * @return {string[]}
 */
export const splitBySpace = (str) => str.trim().split(/\b\s+/);
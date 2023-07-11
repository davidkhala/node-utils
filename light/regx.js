import assert from 'assert';

/**
 * @param {string} source
 * @param {string} flags
 * @returns {RegExp}
 */
export const clone = ({source, flags}) => new RegExp(source, flags);

export function countGroup(regExp) {
	const {source} = regExp;
	return source.match(/\([^()]*\)/g).length;
}

/**
 *
 * @param {string} str
 * @param {RegExp} regExp
 * @returns {boolean}
 */
export const match = (str, regExp) => regExp.test(str);

/**
 *
 * @param {string} str
 * @param {RegExp} regExp
 * @return {string[]|undefined}
 */
export const captureGroups = (str, regExp) => {
	const {source, flags} = regExp;
	const newRegExp = clone({source, flags: flags.replace('g', '')});
	const result = str.match(newRegExp);
	if (result) {
		assert.ok(result.length > 1, `no groups captured, found ${result}`);
		return result.slice(1);
	}
};

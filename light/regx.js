import assert from 'assert';
import util from 'util';

/**
 * @param {string} source
 * @param {string} flags
 * @returns {RegExp}
 */
export const clone = ({source, flags}) => new RegExp(source, flags);

export const equal = (regExpA, regExpB) => util.isDeepStrictEqual(regExpA, regExpB);

export function countGroup({source}) {
	const result = source.match(/\([^()]*\)/g);
	return result ? result.length : 0;
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

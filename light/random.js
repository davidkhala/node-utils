import crypto from 'crypto';

export function randomKeyOf(obj) {
	const keys = Object.keys(obj);
	const keyIndex = crypto.randomInt(keys.length);
	return keys[keyIndex];
}

export const uuid = crypto.randomUUID;
export const randomHex = (length) => crypto.randomBytes(length / 2).toString('hex');

/**
 *
 * @param {number} length integer
 * @return {string} alphaNumeric
 */
export const randomString = (length) => [...Array(length)].map(() => (~~(crypto.randomInt(36))).toString(36)).join('');

export function randomChars(length, charSet) {
	if (!charSet) {
		charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	}
	return [...Array(length)].map(() => charSet.charAt(crypto.randomInt(charSet.length))).join('');
}


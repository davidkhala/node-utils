// total: 293KB
import crypto from 'crypto';

export const randomKeyOf = (obj) => {
	const keys = Object.keys(obj);
	const keyIndex = Math.floor(Math.random() * keys.length);
	return keys[keyIndex];
};
export const randomHex = (length) => {
	return crypto.randomBytes(length / 2).toString('hex');
};
/**
 *
 * @param {number} length integer
 * @return {string} alphaNumeric
 */
export const randomString = (length) => {
	return [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
};

export const randomChars = (length, charSet) => {
	if (!charSet) {
		charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	}
	let result = '';
	for (let i = 0; i < length; i++) {
		result += charSet.charAt(Math.floor(Math.random() * charSet.length));
	}
	return result;
};


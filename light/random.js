// total: 293KB
const crypto = require('crypto');
exports.randomKeyOf = (obj) => {
	const keys = Object.keys(obj);
	const keyIndex = Math.floor(Math.random() * keys.length);
	return keys[keyIndex];
};
exports.randomHex = (length) => {
	return crypto.randomBytes(length / 2).toString('hex');
};
/**
 *
 * @param {number} length integer
 * @return {string} alphaNumeric
 */
exports.randomString = (length) => {
	return [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
};

exports.randomChars = (length, charSet) => {
	if (!charSet) {
		charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	}
	let result = '';
	for (let i = 0; i < length; i++) {
		result += charSet.charAt(Math.floor(Math.random() * charSet.length));
	}
	return result;
};

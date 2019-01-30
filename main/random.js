const crypto = require('crypto');
exports.randomKeyOf = (obj) => {
	const keys = Object.keys(obj);
	const keyIndex = Math.floor(Math.random() * keys.length);
	return keys[keyIndex];
};
exports.randomHex = (length) => {
	return crypto.randomBytes(length).toString('hex');
};
exports.randomString = (length) => {
	return [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
};
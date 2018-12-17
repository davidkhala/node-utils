exports.randomKeyOf = (obj) => {
	const keys = Object.keys(obj);
	const keyIndex = Math.floor(Math.random() * keys.length);
	return keys[keyIndex];
};
const crypto = require('crypto');
exports.randomHex = (length) => {
	return crypto.randomBytes(length).toString('hex');
};

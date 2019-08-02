class TOTP {
	constructor(algorithm = 'sha256', crypto = require('crypto')) {
		if (!(['sha1', 'sha256', 'sha512'].includes(algorithm))) {
			throw Error(`Unsupported algorithm ${algorithm}`);
		}
		const authenticator = require('otplib/authenticator');

		authenticator.options = {
			crypto, algorithm,
			step: 30,
			window: 1,
		};
		this.totp = authenticator;
		this.encode = authenticator.encode;
	}

	generate(secret) {
		return this.totp.generate(secret);
	}

	verify(token, secret) {
		return this.totp.check(token, secret);
	}
}

module.exports = {
	TOTP

};
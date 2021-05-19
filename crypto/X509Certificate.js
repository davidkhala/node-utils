const {X509} = require('jsrsasign');

class X509Certificate {
	constructor(pem) {
		const x509 = new X509();
		x509.readCertPEM(pem);
		this.x509 = x509;
	}

	/**
	 *
	 * @param {boolean} [asString]
	 * @return {string|Object}
	 */
	getSubject(asString) {
		const subject = this.x509.getSubject();
		if (asString) {
			return subject.str;
		}
		const {array} = subject;
		const result = {};
		for (const [item] of array) {
			const {type, value} = item;
			result[type] = value;
		}
		return result;
	}
}

module.exports = X509Certificate;
// https://github.com/kjur/jsrsasign/wiki/Tutorial-for-extensions-when-generating-certificate
class Extension {
	constructor() {
		this.extension = {};
	}

	asBasicConstraints({cA = true, pathLen = 2} = {}) {
		this.extension = {extname: 'basicConstraints', critical: true, cA, pathLen};
	}


	asKeyUsage({names = ['digitalSignature']} = {}) {
		this.extension = {extname: 'keyUsage', names};
	}

	/**
	 * CRL Distribution Points https://github.com/kjur/jsrsasign/wiki/Tutorial-for-extensions-when-generating-certificate#crl-distribution-points
	 * @param points
	 */
	asCRLDistributionPoints(...points) {
		const array = points.map(point => ({fulluri: point}));
		this.extension = {extname: 'cRLDistributionPoints', array};
	}

	/**
	 * @typedef {string|{str:string}|{ldapstr:string}|{certissuer:string}|{certsubject:string}} DN
	 */

	/**
	 * Subject Alternative Name
	 * @param {DN} dn
	 * @param {string} ip
	 * @param {string} uri
	 * @param {string} dns
	 * @param {string} rfc822
	 */
	asSAN({dn, ip, uri, dns, rfc822}) {

		this.extension = {extname: 'subjectAltName', dn, ip, uri, dns, rfc822};
	}

	/**
	 * Issuer Alternative Name
	 * @param {DN} dn
	 * @param {string} ip
	 * @param {string} uri
	 * @param {string} dns
	 * @param {string} rfc822
	 */
	asIAN({dn, ip, uri, dns, rfc822}) {

		this.extension = {extname: 'issuerAltName', dn, ip, uri, dns, rfc822};
	}

	asAdobeTimeStamp({uri, reqauth = true}) {
		this.extension = {extname: 'adobeTimeStamp', uri, reqauth};
	}

}

module.exports = {
	Extension,
};
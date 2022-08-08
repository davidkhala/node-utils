// https://github.com/kjur/jsrsasign/wiki/Tutorial-for-extensions-when-generating-certificate

export class Extension {

	static asBasicConstraints({cA = true, pathLen = 2} = {}) {
		return {extname: 'basicConstraints', critical: true, cA, pathLen};
	}

	static asKeyUsage({names = ['digitalSignature']} = {}) {
		return {extname: 'keyUsage', names};
	}

	/**
	 * CRL Distribution Points https://github.com/kjur/jsrsasign/wiki/Tutorial-for-extensions-when-generating-certificate#crl-distribution-points
	 * @param points
	 */
	static asCRLDistributionPoints(...points) {
		const array = points.map(point => ({fulluri: point}));
		return {extname: 'cRLDistributionPoints', array};
	}

	/**
	 * @typedef {string|{str:string}|{ldapstr:string}|{certissuer:string}|{certsubject:string}} DN
	 */

	/**
	 * Subject Alternative Name
	 */
	static asSAN(dnsArray = [], ipArray = [], uriArray = [], dnArray = [], rfc822Array = []) {

		const array = [].concat(dnsArray.map(dns => ({dns})))
			.concat(ipArray.map(ip => ({ip}))).concat(uriArray.map(uri => ({uri})))
			.concat(dnArray.map(dn => ({dn}))).concat(rfc822Array.map(rfc822 => ({rfc822})));

		return {extname: 'subjectAltName', array};
	}

	/**
	 * Issuer Alternative Name
	 * @param {DN} dn
	 * @param {string} ip
	 * @param {string} uri
	 * @param {string} dns
	 * @param {string} rfc822
	 */
	static asIAN({dn, ip, uri, dns, rfc822}) {
		return {extname: 'issuerAltName', dn, ip, uri, dns, rfc822};
	}

	static asAdobeTimeStamp({uri, reqauth = true}) {
		return {extname: 'adobeTimeStamp', uri, reqauth};
	}

	static asChallenge() {
		throw Error('jsrsasign: extension not supported:{"extname":"challengePassword"}');
	}

	static asUnstructuredName() {
		throw Error(`jsrsasign: extension not supported:{"extname":"unstructuredName"}`);
	}

	static as;
}

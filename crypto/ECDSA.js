const Jsrsasign = require('jsrsasign');
const {KEYUTIL, asn1, ECDSA, jws} = Jsrsasign;

class ECConfig {

	/**
	 * @param {number} keySize Key size for the ECDSA algorithm, can only be 256 or 384
	 */
	constructor(keySize) {

		if (keySize !== 256 && keySize !== 384) {
			throw new Error(`Illegal key size: ${keySize} - this crypto suite only supports key sizes 256 or 384`);
		}


		this._keySize = keySize;

		this._curveName = `secp${keySize}r1`;
	}

	generateEphemeralKey() {
		const pair = KEYUTIL.generateKeypair('EC', this._curveName);
		return new ECPair(pair);
	}
}


class ECPair {
	/**
	 * this class represents an EC key pair.
	 *
	 * @param pair the object generated by jsrsasign.KEYUTIL.generateKeypair()
	 */
	constructor(pair) {
		const {prvKeyObj, pubKeyObj} = pair;

		if (prvKeyObj.type !== 'EC' || !prvKeyObj.pubKeyHex || !prvKeyObj.isPrivate || !prvKeyObj.prvKeyHex) {
			throw new Error('This implementation only supports EC private key generated by jsrsasign.KEYUTIL.');
		}

		this.prvKeyObj = prvKeyObj;
		this.pubKeyObj = pubKeyObj;

	}

	/**
	 * Generates a CSR/PKCS#10 certificate signing request for this key
	 * @param {module.X500Name} subject
	 * @returns {string} PEM-encoded PKCS#10 certificate signing request
	 */
	generateCSR(subject) {

		return asn1.csr.CSRUtil.newCSRPEM({
			subject,
			sbjpubkey: this.pubKeyObj,
			sigalg: 'SHA256withECDSA',//TODO keysize
			sbjprvkey: this.prvKeyObj
		});

	}

	/**
	 * Generates a self-signed X.509 certificate
	 * @returns {string} PEM-encoded X.509 certificate
	 * @param {module.X500Name} subject
	 * @param {module.X500Name} [issuer]
	 */
	generateX509Certificate(subject, issuer = subject) {

		return asn1.x509.X509Util.newCertPEM({
			serial: {int: 4},
			sigalg: {name: 'SHA256withECDSA'},//TODO keysize
			issuer,
			notbefore: {str: jws.IntDate.intDate2Zulu(jws.IntDate.getNow() - 5000)},
			notafter: {str: jws.IntDate.intDate2Zulu(jws.IntDate.getNow() + 315569260)},
			subject,
			sbjpubkey: this.pubKeyObj,
			ext: [
				{
					basicConstraints: {
						cA: false,
						critical: true
					}
				},
				{
					keyUsage: {bin: '11'}
				},
				{
					extKeyUsage: {
						array: [{name: 'clientAuth'}]
					}
				}
			],
			cakey: this.prvKeyObj
		});

	}

	toBytes() {
		return {
			prvKeyObj: KEYUTIL.getPEM(this.prvKeyObj, 'PKCS8PRV'),
			pubKeyObj: KEYUTIL.getPEM(this.pubKeyObj)
		};
	}
}


module.exports.ECDSAConfig = ECConfig;
module.exports.ECDSAKey = ECPair;

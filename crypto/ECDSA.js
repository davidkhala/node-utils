import {KEYUTIL, asn1} from 'jsrsasign';
import {randomHex} from '@davidkhala/light/random.js';

const {x509, csr} = asn1;
const {TBSCertificate, Certificate} = x509;
import {Extension} from './extension.js';

export class ECDSAConfig {

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
		return new ECDSAKeyPair(pair, {keySize: this._keySize});
	}
}


/**
 * this class represents an EC key pair.
 */
export class ECDSAKeyPair {
	/**
	 *
	 * @param {{prvKeyObj,pubKeyObj}} pair The object generated by jsrsasign.KEYUTIL.generateKeypair()
	 * @param [keySize]
	 */
	constructor(pair, {keySize}) {
		const {prvKeyObj, pubKeyObj} = pair;

		if (prvKeyObj.type !== 'EC' || !prvKeyObj.pubKeyHex || !prvKeyObj.isPrivate || !prvKeyObj.prvKeyHex) {
			throw new Error('This implementation only supports EC private key generated by jsrsasign.KEYUTIL.');
		}

		this.signatureAlgorithm = `SHA${keySize}withECDSA`;
		prvKeyObj.toBytes = () => KEYUTIL.getPEM(prvKeyObj, 'PKCS8PRV').trim();
		pubKeyObj.toBytes = () => KEYUTIL.getPEM(pubKeyObj).trim();

		Object.assign(this, {prvKeyObj, pubKeyObj, keySize});
	}

	/**
	 * Generates a CSR/PKCS#10 certificate signing request for this key
	 * @param {X500Name} subject
	 * @param {[]} [extensions] array of certificate extension parameters // TODO WIP
	 * @returns {string} PEM-encoded PKCS#10 certificate signing request
	 */
	generateCSR(subject, extensions) {

		const _csr = new csr.CertificationRequest({
			subject,
			sbjpubkey: this.pubKeyObj,
			sigalg: this.signatureAlgorithm,
			sbjprvkey: this.prvKeyObj,
			extreq: extensions
		});
		return _csr.getPEM();
	}

	/**
	 * Generates X.509 certificate
	 * @returns {string} PEM-encoded X.509 certificate
	 * @param {X500Name} subject
	 * @param {X500Name} [issuer] default to be same as subject and fall into a self-signed scenario
	 * @param {X509Time|string} [effectiveTime] default to now
	 * @param {X509Time|string} expiryTime
	 * @param {number} [serial] default to a random generated 20 bytes HEX
	 * @param extensions
	 */
	generateX509Certificate({
		subject,
		issuer = subject,
		effectiveTime, expiryTime,
		serial, extensions,
	}) {

		if (!serial) {
			serial = {hex: randomHex(20)};// length limit to 20 octets
		}
		if (!extensions) {
			const extension0 = Extension.asKeyUsage({names: ['digitalSignature', 'keyEncipherment', 'clientAuth']});
			extensions = [extension0];
		}
		const tbsobj = new TBSCertificate({
			sigalg: {name: this.signatureAlgorithm},
			serial,
			issuer, // X500Name parameter
			notbefore: effectiveTime && {str: effectiveTime.toString()}, // string, passed to Time, default is Date.now
			notafter: expiryTime && {str: expiryTime.toString()}, // string, passed to Time, default is Date.now
			subject, // X500Name parameter
			sbjpubkey: this.pubKeyObj, // KEYUTIL.getKey pubkey parameter
			// As for extension parameters, please see extension class TODO: how to use extension class
			// All extension parameters need to have "extname" parameter additionaly.
			ext: extensions,
		});


		const cert = new Certificate({
			sigalg: {name: this.signatureAlgorithm},
			tbsobj,
			cakey: this.prvKeyObj
		});
		cert.sign();
		return cert;

	}

	toBytes() {
		return {
			prvKeyObj: KEYUTIL.getPEM(this.prvKeyObj, 'PKCS8PRV'),
			pubKeyObj: KEYUTIL.getPEM(this.pubKeyObj)
		};
	}

}

export class ECDSAKey {
	constructor({prvKeyObj, pubKeyObj, keySize}) {
		Object.assign(this, {prvKeyObj, pubKeyObj, keySize});
	}

	static FromPEM(pem) {
		const _key = KEYUTIL.getKey(pem);
		const keySize = _key.ecparams.keylen;
		if (_key.isPrivate) {
			return new ECDSAKey({prvKeyObj: _key, keySize});
		}
		if (_key.isPublic) {
			return new ECDSAKey({pubKeyObj: _key, keySize});
		}
	}
}

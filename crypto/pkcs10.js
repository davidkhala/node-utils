import {asn1, crypto} from 'jsrsasign';

const {CertificationRequestInfo} = asn1.csr;
const {Signature} = crypto;
//const csr = new asn1.csr.CertificationRequest({
// 			subject,
// 			sbjpubkey: this.pubKeyObj,
// 			sigalg: this.signatureAlgorithm,
// 			sbjprvkey: this.prvKeyObj,
// 			extreq: extensions
// 		});
// 		return csr.getPEM();

export class CSR {

	/**
	 * Generates a unsigned CSR/PKCS#10 (Certificate Signing Request)
	 * @param {X500Name} subject
	 * @param pubKeyObj public key object
	 * @param {[]} [extensions] array of certificate extension parameters // TODO WIP
	 */
	constructor({subject, pubKeyObj, extensions}) {

		this.csrData = new CertificationRequestInfo({subject, sbjpubkey: pubKeyObj, extreq: extensions});
	}

	getUnsignedHex() {
		return this.csrData.tohex();
	}

	/**
	 *
	 * @param {Object} privateKey
	 * @param {string} signatureAlgorithm
	 */
	getSignedBy(privateKey, signatureAlgorithm) {
		const sig = new Signature({alg: signatureAlgorithm});
		sig.init(privateKey);
		sig.updateHex(this.getUnsignedHex());
		const sighex = sig.sign();
		return Buffer.from(sighex, 'hex');
	}

}
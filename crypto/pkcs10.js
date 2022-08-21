import {asn1, crypto} from 'jsrsasign';
import {hex2pem} from './format.js';
import {Attribute} from './attribute.js';

const {DERBitString, DERSequence} = asn1;
const {CertificationRequestInfo} = asn1.csr;
const {AlgorithmIdentifier} = asn1.x509;
const {Signature} = crypto;

export class CSR {

	/**
	 * Generates a unsigned CSR/PKCS#10 (Certificate Signing Request)
	 * @param {X500Name} subject
	 * @param pubKeyObj public key object
	 * @param {[]} [extensions] array of certificate extension parameters
	 * @param {[]} attributes
	 */
	constructor({subject, pubKeyObj, extensions, attributes = []}) {

		const attrs = [
			...attributes,
			{attr: 'extensionRequest', ext: extensions},
		];
		this.csrData = new CertificationRequestInfo({
			subject,
			sbjpubkey: pubKeyObj,
			extreq: extensions,
			attrs,
		});
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
		const sig_hex = sig.sign();

		return this.toPemWithSignature(sig_hex, signatureAlgorithm);
	}

	toPemWithSignature(sig_hex, signatureAlgorithm) {
		const algorithmIdentifier = new AlgorithmIdentifier({name: signatureAlgorithm});
		const asn1Sig = new DERBitString({hex: `00${sig_hex}`});
		const seq = new DERSequence({array: [this.csrData, algorithmIdentifier, asn1Sig]});
		const seq_hex = seq.tohex();
		// to pem
		return hex2pem(seq_hex, 'CERTIFICATE REQUEST');
	}

}

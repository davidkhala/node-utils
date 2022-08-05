import forge from 'node-forge';

const {pki} = forge;
const DNSType = 2;

export class CSR {

	constructor(publicKey, subject, attributes) {
		this.initData = {
			publicKey, subject, attributes
		};
		this.reset();
	}

	reset() {
		this.signed = false;
		const {publicKey, subject, attributes} = this.initData;
		const csr = pki.createCertificationRequest();
		csr.publicKey = publicKey;
		const subjectOptions = [];
		for (const [key, value] of Object.entries(subject)) {
			subjectOptions.push({
				name: key,
				value
			});
		}
		csr.setSubject(subjectOptions);

		const attributeOptions = [];
		for (const [name, value] of Object.entries(attributes)) {
			if (name === 'extensionRequest') {
				const extensions = [];
				for (const [_name, _value] of Object.entries(value)) {
					if (_name === 'subjectAltName') {
						const altNames = _value.map(item => ({type: DNSType, value: item}));// should be array
						extensions.push({name: _name, altNames});
					} else {
						extensions.push({name: _name, value: _value});
					}
				}
				attributeOptions.push({name, extensions});
			} else {
				attributeOptions.push({name, value});
			}

		}
		csr.setAttributes(attributeOptions);
		this.csr = csr;
	}

	getSignedBy(privateKey) {
		this.signed = true;
		this.csr.sign(privateKey);
		return this.csr;
	}

	toString() {
		if (this.signed) {
			return pki.certificationRequestToPem(this.csr);
		}
	}

	static fromString(pem) {
		return pki.certificationRequestFromPem(pem);
	}
}

export class RSA {

	static generateKeyPair(keySize = 2048) {
		const {privateKey, publicKey} = pki.rsa.generateKeyPair(keySize);
		return {privateKey, publicKey};
	}
}

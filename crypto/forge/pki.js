import forge from 'node-forge';

const {pki, asn1} = forge;

const DNSType = 2;

export class CSR {

    constructor(publicKey, subject, attributes) {
        this.initData = {
            publicKey, subject, attributes
        };
        this.reset();
    }

    //csr.sign = function(key, md) {
    //     // TODO: get signature OID from private key
    //     csr.md = md || forge.md.sha1.create();
    //     var algorithmOid = oids[csr.md.algorithm + 'WithRSAEncryption'];
    //     if(!algorithmOid) {
    //       var error = new Error('Could not compute certification request digest. ' +
    //         'Unknown message digest algorithm OID.');
    //       error.algorithm = csr.md.algorithm;
    //       throw error;
    //     }
    //     csr.signatureOid = csr.siginfo.algorithmOid = algorithmOid;
    //
    //     // get CertificationRequestInfo, convert to DER
    //     csr.certificationRequestInfo = pki.getCertificationRequestInfo(csr);
    //     var bytes = asn1.toDer(csr.certificationRequestInfo);
    //
    //     // digest and sign
    //     csr.md.update(bytes.getBytes());
    //     csr.signature = key.sign(csr.md);
    //   };

    toDer() {
        const certificationRequestInfo = pki.getCertificationRequestInfo(this.csr);
        const bytes = asn1.toDer(certificationRequestInfo);
        return bytes.getBytes();

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


export class PublicKey {
    static fromPEM(pem) {
        return pki.publicKeyFromPem(pem)
    }
}
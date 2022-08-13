import {CSR, RSA, PublicKey} from '../../forge/pki.js';
import {chars2Hex} from '@davidkhala/light/format.js';
import assert from 'assert';

describe('csr', () => {
	const {privateKey, publicKey} = RSA.generateKeyPair(2048);
	const subject = {
		commonName: 'oracle', countryName: 'China', localityName: 'HongKong', organizationName: 'hyperledger.org'
	};
	const attrs = {
		challengePassword: 'password', unstructuredName: 'My Company, Inc.', extensionRequest: {
			subjectAltName: ['test.domain.com', 'www.oracle.com', 'www.hyperledger.org']
		}
	};
	const csr = new CSR(publicKey, subject, attrs);
	it('toString', () => {

		csr.getSignedBy(privateKey);
		console.debug('after sign=========');
		console.debug(csr.toString());
	});
	it('toDer', () => {
		const derBytes = csr.toDer();
		console.info(chars2Hex(derBytes));

	});
});
describe('public key', () => {
	it('Error: reading a ecdsa public key pem is not allowed', async () => {
		const pem = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEYI7cFGMwqDz17Tywc0bMIZbcIrQP
0QWAvGo+DBLMk5v+zX2C/dHFhgTXhdBI4TnVX6PWv3I6BgVTKEAPxmlW4Q==
-----END PUBLIC KEY-----`;
		try {
			PublicKey.fromPEM(pem);
		} catch (e) {
			assert.ok(e.message === 'Cannot read public key. Unknown OID.');
			assert.ok(e.oid === '1.2.840.10045.2.1');
		}


	});
});

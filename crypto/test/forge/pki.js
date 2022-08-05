import {CSR, RSA} from '../../forge/pki.js';

describe('csr', () => {
	it('smoke', () => {
		const {privateKey, publicKey} = RSA.generateKeyPair(2048);
		const subject = {
			commonName: 'oracle',
			countryName: 'China',
			localityName: 'HongKong',
			organizationName: 'hyperledger.org'
		};
		const attrs = {
			challengePassword: 'password',
			unstructuredName: 'My Company, Inc.',
			extensionRequest: {
				subjectAltName: ['test.domain.com', 'www.oracle.com', 'www.hyperledger.org']
			}
		};
		const csr = new CSR(publicKey, subject, attrs);
		console.debug('before sign: cannot toString');
		// console.debug(csr.toString());
		csr.getSignedBy(privateKey);
		console.debug('after sign=========');
		console.debug(csr.toString());
	});
});

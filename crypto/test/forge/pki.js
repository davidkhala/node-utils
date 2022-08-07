import {CSR, RSA} from '../../forge/pki.js';
import {chars2Hex} from '@davidkhala/light/format.js';

describe('csr', () => {
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
	it('toString', () => {
		try {
			csr.toString();
		} catch (e) {
			// expected error
			console.info('before sign: cannot toString');
		}

		csr.getSignedBy(privateKey);
		console.debug('after sign=========');
		console.debug(csr.toString());
	});
	it('toDer', () => {
		const derBytes = csr.toDer();
		console.info(chars2Hex(derBytes));

	});
});

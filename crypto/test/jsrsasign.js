import {asn1, X509} from 'jsrsasign';
import {CSR} from '../pkcs10.js';
import {ECDSAKey, ECDSAConfig} from '../ECDSA.js';
import X500Name from '../X500Name.js';
import {Extension} from '../extension.js';

describe('x509', () => {

	const x509 = new X509();
	const pem = `-----BEGIN CERTIFICATE-----
MIIBsDCCAVagAwIBAgIK4I7KBQLVmJNP1zAKBggqhkjOPQQDAjBTMREwDwYDVQQG
Ewhob25na29uZzEUMBIGA1UECgwLaHlwZXJsZWRnZXIxEzARBgNVBAsMCmJsb2Nr
Y2hhaW4xEzARBgNVBAMMCmRhdmlka2hhbGEwHhcNMjEwNDIwMDMxNjEzWhcNMjEw
NDIwMDMxNjEzWjBTMREwDwYDVQQGEwhob25na29uZzEUMBIGA1UECgwLaHlwZXJs
ZWRnZXIxEzARBgNVBAsMCmJsb2NrY2hhaW4xEzARBgNVBAMMCmRhdmlka2hhbGEw
WTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAARCmMsJkJ/Wv3cN+EMtqSc2PhxmlAMz
7b7ranb7KWQNpBrmWvJgxCXriQ/Uq84EPAWtcGPiUnpvU2b/lUfVORgIoxIwEDAO
BgNVHQ8BAf8EBAMCBaAwCgYIKoZIzj0EAwIDSAAwRQIhAPXXeOl/V03I+p7wJkBM
+8hRO5z5OKi7NJSiMArqOSlLAiBbimxEwAZFZKIuUyI1MW2Uu7YolzJdYv8iDSp4
uh/bNA==
-----END CERTIFICATE-----
`;
	x509.readCertPEM(pem);
	it('x509 class methods', () => {

		const methods = Object.keys(x509);
		console.info(methods);
	});

	it('getSubject', () => {
		const subject = x509.getSubject();
		const {array, str} = subject;
		console.log(array);
		console.log(str);
	});
	it('get Extensions', () => {
		const allExt = x509.getExtParamArray();
		console.log(allExt);
	});
	it('ldapToOneline', () => {
		const subjectDN = 'abc';
		const oneLine = asn1.x509.X500Name.ldapToOneline(subjectDN);
		console.debug(oneLine);
	});


});
describe('csr', () => {
	const subject = new X500Name();
	subject.setCountryName('HK');
	subject.setOrganizationName('Hyperledger');
	subject.setOrgUnitName('blockchain');
	subject.setCommonName('davidkhala');
	const extension0 = Extension.asSAN(['*.hyperledger.org']);
	const extensions = [extension0];
	it('from PEM, get unsigned CSR', () => {
		const pem = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEYI7cFGMwqDz17Tywc0bMIZbcIrQP
0QWAvGo+DBLMk5v+zX2C/dHFhgTXhdBI4TnVX6PWv3I6BgVTKEAPxmlW4Q==
-----END PUBLIC KEY-----`;
		const key = ECDSAKey.FromPEM(pem);

		const csr = new CSR({subject, pubKeyObj: key.pubKeyObj, extensions});

		const unsignedHex = csr.getUnsignedHex();
		console.info(unsignedHex);
	});
	it('self generate key, get CSR in PEM', () => {
		const keyConfig = new ECDSAConfig(256);
		const keyPair = keyConfig.generateEphemeralKey();
		const csr = new CSR({subject, pubKeyObj: keyPair.pubKeyObj, extensions});
		const pem = csr.getSignedBy(keyPair.prvKeyObj, keyPair.signatureAlgorithm);
		console.debug(pem);
	});
});
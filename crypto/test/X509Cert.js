const X509Certificate = require('../X509Certificate');
const assert = require('assert');
describe('X509Certificate', () => {
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
	const x509 = new X509Certificate(pem);
	it('getSubject', () => {
		const str = x509.getSubject(true);
		assert.strictEqual(str, '/C=hongkong/O=hyperledger/OU=blockchain/CN=davidkhala');
		const subject = x509.getSubject();
		assert.strictEqual(subject.C, 'hongkong');
		assert.strictEqual(subject.O, 'hyperledger');
		assert.strictEqual(subject.OU, 'blockchain');
		assert.strictEqual(subject.CN, 'davidkhala');
	});
});
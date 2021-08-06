const jsrsasign = require('jsrsasign');

describe('x509', () => {
	const {X509} = jsrsasign;
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
		const oneLine = jsrsasign.asn1.x509.X500Name.ldapToOneline(subjectDN);
		console.debug(oneLine);
	});


});
const logger = require('../../main/').devLogger('test:ecdsa');
const X500Name = require('../X500Name');
const {ECDSACOnfig, ECDSAKey} = require('../ECDSA');
const config = new ECDSACOnfig(256);
const keypair = config.generateEphemeralKey();

const taskPrintPriv = () => {
	logger.debug(keypair.prvKeyObj);

};
const taskPrintPub = () => {
	logger.debug(keypair.pubKeyObj);
};

const taskSignVerifyWithHash = () => {
	const raw = '123';
	const signature = keypair.prvKeyObj.signWithMessageHash(raw);

	const result = keypair.pubKeyObj.verifyWithMessageHash(raw, signature);
	logger.debug('result', result);
};
const taskSignVerify = () => {
	const raw = '123';
	const signature = keypair.prvKeyObj.signHex(raw, keypair.prvKeyObj.prvKeyHex);

	const result = keypair.pubKeyObj.verifyHex(raw, signature, keypair.pubKeyObj.pubKeyHex);
	logger.debug('result', result);
};

const x500Name = new X500Name();
x500Name.setCountryName('HK');
x500Name.setOrganizationName('ASTRI');
x500Name.setOrgUnitName('ICDD');
x500Name.setCommonName('david');
const taskGenCSR = () => {

	const csr = keypair.generateCSR(x500Name.build());
	logger.debug('csr', csr);
};
const taskSelfSignCert = () => {
	const cert = keypair.generateX509Certificate(x500Name.build());
	logger.debug('cert', cert);
};
taskSelfSignCert();

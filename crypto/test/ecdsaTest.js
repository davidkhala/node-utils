const logger = require('khala-logger/log4js').consoleLogger('test:ecdsa');
const X500Name = require('../X500Name');
const fs = require('fs');
const path = require('path');
const {ECDSAConfig, ECDSAKey} = require('../ECDSA');
const config = new ECDSAConfig(256);
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


const taskGenCSR = (x500Name) => {

	const csr = keypair.generateCSR(x500Name);
	logger.debug('csr', csr);
};
const taskSelfSignCert = (x500Name) => {
	const prvKeyPem = keypair.toBytes().prvKeyObj;

	const cert = keypair.generateX509Certificate(x500Name);

	const keyPath = path.resolve(__dirname, 'fixture/key.pem');
	const certPath = path.resolve(__dirname, 'fixture/cert.pem');
	fs.writeFileSync(keyPath, prvKeyPem);
	fs.writeFileSync(certPath, cert);
};
const task = async () => {
	const x500Name = new X500Name();
	x500Name.setCountryName('HK');
	x500Name.setOrganizationName('QHMS');
	x500Name.setOrgUnitName('blockchain');
	x500Name.setCommonName('blockchain.QHMS.com');
	switch (parseInt(process.env.taskID)) {
		case 0:
			taskGenCSR(x500Name);
			break;
		default:
			taskSelfSignCert(x500Name);
	}
};
task();

const logger = require('../../').devLogger('test:ecdsa');
const {ECDSACOnfig, ECDSAKey} = require('../ECDSA');
const config = new ECDSACOnfig(256);
const keypair = config.generateEphemeralKey();

const taskPrintPriv = () => {
	logger.debug(keypair.toBytes().prvKeyObj);
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
	const signature = keypair.prvKeyObj.signHex(raw,keypair.prvKeyObj.prvKeyHex);

	const result = keypair.pubKeyObj.verifyHex(raw, signature,keypair.pubKeyObj.pubKeyHex);
	logger.debug('result', result);
};
taskSignVerify();

import {consoleLogger} from '@davidkhala/logger/log4.js';
import X500Name from '../X500Name.js';
import {ECDSAConfig} from '../ECDSA.js';
import fs from 'fs';
import path from 'path';
import {Extension} from '../extension.js';
import {X509Time} from '../x509.js';
import {filedirname} from '@davidkhala/light/es6.mjs';
import forge from 'node-forge';

filedirname(import.meta);

const logger = consoleLogger('test:ecdsa');

const config = new ECDSAConfig(256);

describe('csr', () => {

	it('generate CSR', () => {
		const keypair = config.generateEphemeralKey();
		const x500Name = new X500Name();
		x500Name.setCountryName('HK');
		x500Name.setOrganizationName('Hyperledger');
		x500Name.setOrgUnitName('blockchain');
		x500Name.setCommonName('davidkhala');
		const extension = Extension.asSAN(['*.hyperledger.org']);
		const csr = keypair.generateCSR(x500Name, [extension]);
		fs.writeFileSync(path.resolve('test', 'artifacts', 'csr.pem'), csr);
		logger.debug('csr\n', csr);
	});

});
describe('key pair', () => {
	it('explore structure', () => {
		const keypair = config.generateEphemeralKey();
		console.debug(keypair.prvKeyObj.toBytes());
		console.debug(keypair.pubKeyObj.toBytes());
	});
	it('self-sign cert generate', () => {
		const keypair = config.generateEphemeralKey();
		const prvKeyPem = keypair.toBytes().prvKeyObj;

		const x500Name = new X500Name();
		x500Name.setCountryName('hongkong');
		x500Name.setOrganizationName('hyperledger');
		x500Name.setOrgUnitName('blockchain');
		x500Name.setCommonName('davidkhala');
		const expiryTime = new X509Time(Date.now() + 31556926000);
		const cert = keypair.generateX509Certificate({subject: x500Name, expiryTime});

		const keyPath = path.resolve(__dirname, 'fixture/key.pem');
		const certPath = path.resolve(__dirname, 'fixture/cert.pem');
		fs.writeFileSync(keyPath, prvKeyPem);
		fs.writeFileSync(certPath, cert.getPEM());
	});
	it('print private', () => {
		const keypair = config.generateEphemeralKey();
		logger.debug(keypair.prvKeyObj);
	});
	it('print public', () => {
		const keypair = config.generateEphemeralKey();
		logger.debug(keypair.pubKeyObj);
	});
	it('sign::verify', () => {
		const keypair = config.generateEphemeralKey();
		const raw = '123';
		const signature = keypair.prvKeyObj.signHex(raw, keypair.prvKeyObj.prvKeyHex);

		const result = keypair.pubKeyObj.verifyHex(raw, signature, keypair.pubKeyObj.pubKeyHex);
		logger.debug(result);
	});
	it('sign, verify with hash', () => {
		const keypair = config.generateEphemeralKey();
		const raw = '123';
		const signature = keypair.prvKeyObj.signWithMessageHash(raw);

		const result = keypair.pubKeyObj.verifyWithMessageHash(raw, signature);
		logger.debug(result);
	});
});

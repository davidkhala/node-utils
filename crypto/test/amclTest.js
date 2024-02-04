import {consoleLogger} from '@davidkhala/logger/log4.js';
import CTX from '@davidkhala/milagro-crypto-js';
import assert from 'assert';

const logger = consoleLogger('test:amcl');
const algorithmList = [
	'ED25519', 'C25519', 'SECP256K1', 'NIST256', 'NIST384', 'BRAINPOOL',
	'ANSSI', 'HIFIVE', 'GOLDILOCKS', 'C41417', 'NIST521', 'NUMS256W', 'NUMS256E',
	'NUMS384W', 'NUMS384E', 'NUMS512W', 'NUMS512E', 'FP256BN', 'FP512BN', 'BN254',
	'BN254CX', 'BLS383', 'BLS24', 'BLS48', 'BLS381', 'BLS461', undefined
];

describe('amcl', () => {
	it('algorithm smoke', () => {
		algorithmList.forEach(algo => {
			assert.doesNotThrow(() => new CTX(algo));
		});
	});


});

describe('RSA', () => {


	it('original example', function () {
		this.timeout(30000);
		const ctx = new CTX('RSA2048');

		logger.info('Start test RSA 2048 with key generation');


		const rng = new ctx.RAND();

		rng.seed(100, []);

		const sha = ctx.RSA.HASH_TYPE;
		const message = 'Hello World\n';
		const pub = new ctx.rsa_public_key(ctx.FF.FFLEN);
		const priv = new ctx.rsa_private_key(ctx.FF.HFLEN);

		const ML = [];
		const C = [];
		const S = [];

		let start, end, time;
		start = new Date().getTime();
		logger.info('Generating RSA public/private key pair (slow!)');
		ctx.RSA.KEY_PAIR(rng, 65537, priv, pub);
		logger.debug(priv.p.toString());
		logger.debug(priv.q.toString());
		logger.debug(priv.dp.toString());
		logger.debug(priv.dq.toString());
		logger.debug(priv.c.toString());


		end = new Date().getTime();
		time = end - start;
		console.log('Time in ms= ' + time);

		const M = ctx.RSA.stringtobytes(message);
		console.log('Encrypting test string');

		const E = ctx.RSA.OAEP_ENCODE(sha, M, rng, null); /* OAEP encode message m to e  */
		console.log('Encoding= 0x' + ctx.RSA.bytestohex(E));

		console.log('Public key= 0x' + pub.n.toString());

		start = new Date().getTime();
		ctx.RSA.ENCRYPT(pub, E, C); /* encrypt encoded message */
		end = new Date().getTime();
		time = end - start;
		console.log('Time in ms= ' + time);

		console.log('Ciphertext= 0x' + ctx.RSA.bytestohex(C));

		console.log('Decrypting test string');
		start = new Date().getTime();
		ctx.RSA.DECRYPT(priv, C, ML);
		end = new Date().getTime();
		time = end - start;
		console.log('Time in ms= ' + time);

		let cmp = true;
		if (E.length !== ML.length) {
			cmp = false;
		} else {
			for (let j = 0; j < E.length; j++) {
				if (E[j] !== ML[j]) {
					cmp = false;
				}
			}
		}

		if (cmp) {
			console.log('Decryption is OK');
		} else {
			console.error('Decryption Failed');
			process.exit(-1);
		}

		const MS = ctx.RSA.OAEP_DECODE(sha, null, ML); /* OAEP decode message  */
		console.log('Decoding= 0x' + ctx.RSA.bytestohex(MS));

		console.log('message= ' + ctx.RSA.bytestostring(MS));

		console.log('Start test RSA signature');

		ctx.RSA.PKCS15(sha, M, C);

		ctx.RSA.DECRYPT(priv, C, S); /* create signature in S */

		console.log('Signature= 0x' + ctx.RSA.bytestohex(S));

		ctx.RSA.ENCRYPT(pub, S, ML);

		cmp = true;
		if (C.length !== ML.length) {
			cmp = false;
		} else {
			for (let j = 0; j < C.length; j++) {
				if (C[j] !== ML[j]) {
					cmp = false;
				}
			}
		}

		if (cmp) {
			console.log('Signature is valid');
		} else {
			console.error('Signature is INVALID');
			process.exit(-1);
		}
		ctx.RSA.PRIVATE_KEY_KILL(priv);

		console.log('SUCCESS');
	});


});

describe('For idemix', () => {
	const algorithm = 'FP256BN';
	const ctx = new CTX(algorithm);

	const rand = new ctx.RAND();
	const fp = new ctx.FP();
	// TODO
//	public IdemixCredRequest(BIG sk, BIG issuerNonce, IdemixIssuerPublicKey ipk) {
//         final RAND rng = IdemixUtils.getRand();
//         nym = ipk.getHsk().mul(sk);
//         this.issuerNonce = new BIG(issuerNonce);
//
//         // Create Zero Knowledge Proof
//         BIG rsk = IdemixUtils.randModOrder(rng);
//         ECP t = ipk.getHsk().mul(rsk);
//
//         // Make proofData: total 3 elements of G1, each 2*FIELD_BYTES+1 (ECP),
//         // plus length of String array,
//         // plus one BIG
//         byte[] proofData = new byte[0];
//         proofData = IdemixUtils.append(proofData, CREDREQUEST_LABEL.getBytes());
//         proofData = IdemixUtils.append(proofData, IdemixUtils.ecpToBytes(t));
//         proofData = IdemixUtils.append(proofData, IdemixUtils.ecpToBytes(ipk.getHsk()));
//         proofData = IdemixUtils.append(proofData, IdemixUtils.ecpToBytes(nym));
//         proofData = IdemixUtils.append(proofData, IdemixUtils.bigToBytes(issuerNonce));
//         proofData = IdemixUtils.append(proofData, ipk.getHash());
//
//         proofC = IdemixUtils.hashModOrder(proofData);
//
//         // Compute proofS = ...
//         proofS = BIG.modmul(proofC, sk, IdemixUtils.GROUP_ORDER).plus(rsk);
//         proofS.mod(IdemixUtils.GROUP_ORDER);
//     }
});

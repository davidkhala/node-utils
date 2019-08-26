const secret = 'AVSDEFOJAWEO2'; //AVSDEFOJAWEO2
const {TOTP} = require('./otp');
const totpTest = (algo) => {
	const totp = new TOTP(algo);
	const encoded = totp.encode(secret);
	const result = totp.generate(encoded);
	console.log(algo, result, totp.verify(result, encoded));

};
const task = () => {
	totpTest('sha1');
	totpTest('sha256');
	totpTest('sha512');
};
const verify = (token, algo) => {
	const totp = new TOTP(algo);
	const result = totp.verify(token, secret);
	console.log(algo, result);
};
const verifyTask = (token) => {
	verify(token, 'sha1');
	verify(token, 'sha256');
	verify(token, 'sha512');
};
const alter = () => {
	const {totp} = require('node-otp');

	const result = totp({
		secret,
	});
	console.log(result);
};
const alter2 = () => {
	const OTPAuth = require('otpauth');

	const totp = new OTPAuth.TOTP({
		algorithm: 'SHA512',// 'SHA1'
		digits: 6,
		period: 30,
		secret: OTPAuth.Secret.fromB32(secret)
	});


	let token = totp.generate();
	console.log(token);
};
// verifyTask('202127');
// task();
alter2();
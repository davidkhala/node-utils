/**
 * get PEM string from hexadecimal data and header string
 * @function
 * @param {String} dataHex hexadecimal string of PEM body
 * @param {String} pemHeader PEM header string (ex. 'RSA PRIVATE KEY')
 * @return {String} PEM formatted string of input data
 * @since jsrasign 7.2.1 base64x 1.1.12
 * @description
 * This function converts a hexadecimal string to a PEM string with
 * a specified header. Its line break will be CRLF("\r\n").
 */
export function hex2pem(dataHex, pemHeader) {
	const pemBody = hex2base64nl(dataHex);
	return '-----BEGIN ' + pemHeader + '-----\r\n' +
		pemBody +
		'\r\n-----END ' + pemHeader + '-----\r\n';
}
/**
 * convert a hexadecimal string to Base64 encoded string with new lines<br/>
 * @function
 * @param {String} s hexadecimal string
 * @return {String} resulted Base64 encoded string with new lines
 * @since base64x 1.1.3
 * @description
 * This function converts from a hexadecimal string to Base64 encoded
 * string with new lines for each 64 characters. This is useful for
 * PEM encoded file.
 * @example
 * hextob64nl("123456789012345678901234567890123456789012345678901234567890")
 * &rarr;
 * MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MDEyMzQ1Njc4 // new line
 * OTAxMjM0NTY3ODkwCg==
 */
export function hex2base64nl(s) {
	const b64 = Buffer.from(s, 'hex').toString('base64');
	const b64nl = b64.replace(/(.{64})/g, '$1\r\n');
	return b64nl.replace(/\r\n$/, '');
}
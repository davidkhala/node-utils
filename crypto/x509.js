// https://datatracker.ietf.org/doc/html/rfc5280#section-4.1.2.5.1
// YYMMDDHHMMSSZ
const dateFormat = require('date-format');
const dateFormatMask = 'yyMMddhhmmssZ';

class X509Time {
	/**
	 * @param {Date|number} [date]
	 */
	constructor(date = new Date()) {
		if (typeof date === 'number') {
			date = new Date(date);
		}
		Object.assign(this, {date});
	}

	toString() {
		return dateFormat(dateFormatMask, this.date);
	}
}

module.exports = {
	X509Time
};
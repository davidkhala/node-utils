import {asn1} from 'jsrsasign';
import {X509Time} from '../x509.js';

const {Time} = asn1.x509;
describe('x509Time', () => {
	it('build date-time', () => {
		console.debug(new X509Time().toString());
	});
	it('default utcTime', () => {

		const time1 = new Time({'str': new X509Time().toString()});
		console.debug(time1);

	});
	it('generalTime', () => {
		const time2 = new Time({'type': 'gen', 'str': new X509Time().toString()});
	});
});




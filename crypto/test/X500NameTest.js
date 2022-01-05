import X500Name from '../X500Name.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';

const logger = consoleLogger('X500Name');
describe('X500Name', () => {
	it('build', () => {
		const name = new X500Name();
		name.setCommonName('a');
		name.setCountryName('US');
		name.setOrganizationName('IBM');
		name.setStateName('California');
		logger.info(name.toString());
	});
});

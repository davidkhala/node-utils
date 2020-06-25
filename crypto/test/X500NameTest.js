const X500Name = require('../X500Name');
const logger = require('khala-logger/log4js').consoleLogger('X500Name');
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

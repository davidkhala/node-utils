const X500Name = require('../X500Name');
const name = new X500Name();
name.setCommonName("a");
name.setCountryName('US');
name.setOrganizationName('IBM');
name.setStateName('California');
console.log(name.build());
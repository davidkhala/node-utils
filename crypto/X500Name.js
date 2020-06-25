/**
 *
 * @type {module.X500Name}
 */
module.exports = class X500Name {

	setCommonName(s) {
		this.CN = s;
	}

	setCountryName(s) {
		this.C = s;
	}

	setLocalityName(s) {
		this.L = s;
	}

	setOrganizationName(s) {
		this.O = s;
	}

	setOrgUnitName(s) {
		this.OU = s;
	}

	setStateName(s) {
		this.ST = s;
	}

	toString() {
		return Object.entries(this).map(([key, value]) => `${key}=${value}`).join(',');
	}

};

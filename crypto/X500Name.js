module.exports = class X500Name {

	constructor() {
		this._buildBuff = {};
	}

	setCommonName(s) {
		this._buildBuff.CN = s;
	}

	setCountryName(s) {
		this._buildBuff.C = s;
	}

	setLocalityName(s) {
		this._buildBuff.L = s;
	}

	setOrganizationName(s) {
		this._buildBuff.O = s;
	}

	setOrgUnitName(s) {
		this._buildBuff.OU = s;
	}

	setStateName(s) {
		this._buildBuff.ST = s;
	}

	build() {
		return Object.entries(this._buildBuff).map(([key, value]) => `${key}=${value}`).join(',');
	}

};
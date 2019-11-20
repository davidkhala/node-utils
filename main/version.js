const versionPattern = /^\d+\.\d+\.\d+$/;
const validVersion = (version) => version.match(versionPattern);
/**
 * @enum {string}
 */
const IncrementLevel = {
	major: 'major',
	minor: 'minor',
	patch: 'patch'
};
exports.IncrementLevel = IncrementLevel;

/**
 * version pattern : 0.0.0, not strictly SemVer format
 * @param {string} prevVersion
 * @param {IncrementLevel} incrementLevel
 * @return {string}
 */
exports.nextVersion = (prevVersion, incrementLevel = IncrementLevel.patch) => {
	if (!prevVersion) {
		return '0.0.0';
	}
	if (!validVersion(prevVersion)) {
		throw Error(`invalid version format:${prevVersion}`);
	}
	const [major, minor, patch] = prevVersion.split('.').map((s) => parseInt(s));
	switch (incrementLevel) {
		case IncrementLevel.major:
			return `${major + 1}.${minor}.${patch}`;
		case IncrementLevel.minor:
			return `${major}.${minor + 1}.${patch}`;
		case IncrementLevel.patch:
			return `${major}.${minor}.${patch + 1}`;
	}
};
exports.validVersion = validVersion;
/**
 * @typedef {function} versionComparator
 * @param {string} newVersion
 * @param {string} oldVersion
 * @return boolean
 */

/**
 * @type {versionComparator}
 */
exports.newerVersion = (newVersion, oldVersion) => {
	const [majorN, minorN, patchN] = newVersion.split('.').map((s) => parseInt(s));
	const [majorO, minorO, patchO] = oldVersion.split('.').map((s) => parseInt(s));
	return majorN > majorO || minorN > minorO || patchN > patchO;
};

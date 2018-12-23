const versionPattern = /^\d+\.\d+\.\d+$/;
const validVersion = (version) => version.match(versionPattern);
/**
 * version pattern : 0.0.0
 * @param prevVersion
 * @param incrementLevel major|minor|patch
 * @return {string}
 */
exports.nextVersion = (prevVersion, incrementLevel) => {
	if (!prevVersion) return '0.0.0';
	if (!validVersion(prevVersion)) throw Error(`invalid version format:${prevVersion}`);
	const [major, minor, patch] = prevVersion.split('.').map((s) => parseInt(s));
	switch (incrementLevel) {
		case 'major':
			return `${major + 1}.${minor}.${patch}`;
		case 'minor':
			return `${major}.${minor + 1}.${patch}`;
		case 'patch':
			return `${major}.${minor}.${patch + 1}`;
		default:
			throw Error(`invalid increment level:${incrementLevel}`);
	}
};
exports.validVersion = validVersion;

exports.newerVersion = (versionN, versionO) => {
	let [majorN, minorN, patchN] = versionN.split('.').map((s) => parseInt(s));
	let [majorO, minorO, patchO] = versionO.split('.').map((s) => parseInt(s));
	return majorN > majorO || minorN > minorO || patchN > patchO;
};
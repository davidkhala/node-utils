export class Attribute {
	static asChallengePassword(password) {
		return {attr: 'challengePassword', password};
	}

	static asUnstructuredName(name) {
		// {attr: "unstructuredName", names: [{utf8str:"aaa"},{ia5str:"bbb"}]},
		return {attr: 'unstructuredName', names: [{utf8str: name}]};
	}

}

export class File {
	constructor(content) {
		this.content = content;
	}

	grep(word, withIndex) {
		if (withIndex) {
			const origin = this.lines.map((content, line) => ({line, content}));
			if (word.constructor === RegExp) {
				return origin.filter((e) => word.test(e.content));
			} else if (typeof word === 'string') {
				return origin.filter((e) => e.content.toLowerCase().indexOf(word.toLowerCase()) >= 0);
			}

		} else {
			if (word.constructor === RegExp) {
				return this.lines.filter(e => word.test(e));
			} else if (typeof word === 'string') {
				return this.lines.filter((e) => e.toLowerCase().indexOf(word.toLowerCase()) >= 0);
			}
		}
		return [];
	}

	get lines() {
		return this.content.split('\n');
	}
}


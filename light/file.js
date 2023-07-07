import fs from 'fs';

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
		if (!this._lines) {// a memory cache
			this._lines = this.content.split(/\r?\n/);
		}
		return this._lines;
	}
}

export const read = (_path) => fs.readFileSync(_path, 'utf8');

export const write = (_path, data) => fs.writeFileSync(_path, data);
export const isDirectory = (file) => fs.existsSync(file) && fs.lstatSync(file).isDirectory();



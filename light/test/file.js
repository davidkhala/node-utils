import {File} from '../file.js';
import {read} from '../fs.js';
import {resolve} from '../es6.mjs';
import assert from 'assert';

describe('file.js', () => {
	it('grep', () => {
		const content = read(resolve(import.meta, './test.json'));
		const file = new File(content);
		const {line, content: _content} = file.grep('a', true)[0];
		const expectedContent = '  "a": 1\r';
		assert.strictEqual(line, 1);
		assert.strictEqual(_content, expectedContent);
		assert.strictEqual(file.grep('a')[0], '  "a": 1\r');
	});
});

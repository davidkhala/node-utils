import dateFormat from 'dateformat';
import assert from 'assert';

describe('why we not choosing npm dateformat', () => {
	it('case sensitive pattern', () => {
		const now = new Date();
		assert.notEqual(dateFormat(now, 'YYYYMMDDHHMMSS'), dateFormat(now, 'yyyymmddhhmmss'));
	});
});
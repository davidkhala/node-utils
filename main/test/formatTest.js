import {dateFormat} from '../format.js';
import assert from 'assert';

describe('format test', () => {

	it('dateFormat', () => {
		const date = new Date('2021-03-30T15:10:05.101Z');

		const dateString = dateFormat('yyyyMMdd', date);
		assert.strictEqual(dateString, '20210330');
	});

});

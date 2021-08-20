const dateFormat = require('dateformat');
describe('why we not choosing date format', () => {
	it('', () => {
		const now = new Date();

		console.debug(dateFormat(now, 'YYMMDDHHMMSSZ'));
		console.debug(dateFormat(now, 'yymmddhhmmssz'));
	});
});
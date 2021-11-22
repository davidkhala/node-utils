import dateFormat from 'dateformat';

describe('why we not choosing date format', () => {
	it('different template pattern', () => {
		const now = new Date();

		console.debug(dateFormat(now, 'YYMMDDHHMMSSZ'));
		console.debug(dateFormat(now, 'yymmddhhmmssz'));
	});
});
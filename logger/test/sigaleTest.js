import signale from 'signale';

const {Signale} = signale;

describe('signale', () => {

	it('demo', () => {
		signale.config({
			displayFilename: true,
		});

		signale.debug('debug');
		signale.log('log');
		signale.info('info');
		signale.warn('warn');
		signale.error('error');
		signale.fatal('fatal');

	});
	it('overwrite existing function', () => {
		const options = {
			types: {
				error: {
					badge: '!!',
					label: 'fatal error'
				},
			}
		};
		const custom = new Signale(options);
		custom.error('Custom Error Log');

	});
});

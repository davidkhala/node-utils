const signale = require('signale');
const {Signale} = signale;
/**
 * Below are all native logging function
 */

// - `debug`
// - `info`
// - `log`
// - `warn`
// - `error`
// - `fatal`

// - `await`
// - `complete`
// - `fav`
// - `note`
// - `pause`
// - `pending`
// - `star`
// - `start`
// - `success`
// - `watch`

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

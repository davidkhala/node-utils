export function successHandle (message, res, logger)  {
	if (logger) {
		logger.info('message', message);
	}
	res.json({
		errCode: 'success',
		message
	});
}
export function errorSyntaxHandle (err, res, logger) {
	if (logger) {
		logger.error(err);
	}
	res.json({errCode: 'error', message: err.message});
}
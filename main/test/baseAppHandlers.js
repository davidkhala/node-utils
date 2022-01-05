export const successHandle = (message, res, logger) => {
	if (logger) {
		logger.info('message', message);
	}
	res.json({
		errCode: 'success',
		message
	});
};
export const errorSyntaxHandle = (err, res, logger) => {
	if (logger) {
		logger.error(err);
	}
	res.json({errCode: 'error', message: err.message});
};
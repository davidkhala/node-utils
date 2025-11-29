export function successHandle (message, res)  {
	res.json({
		errCode: 'success',
		message
	});
}
export function errorSyntaxHandle (err, res) {
	res.json({errCode: 'error', message: err.message});
}
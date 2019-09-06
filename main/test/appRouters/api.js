const BaseApp = require('../../baseApp');
const router = BaseApp.getRouter();
const invalidHttpMessage = {message: 'Unsupported http method'};
const {successHandle, errorSyntaxHandle} = require('../baseAppHandlers');
router.all('/:id', async (req, res) => {
	const {id} = req.params;
	let result = `${id}:`;
	switch (req.method) {
		case 'PUT':
			result += req.method;
			break;
		case 'DELETE':
			result += req.method;
			break;
		case 'GET':
			result += req.method;
			break;
		default:
			errorSyntaxHandle(invalidHttpMessage, res);
			return;
	}
	successHandle(result, res);
});
module.exports = router;
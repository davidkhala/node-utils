const port = 4000;
const nodeUtil = require('../index');
const {run, expressError} = nodeUtil.baseApp();
const {trimExtName} = nodeUtil.helper();
const {errorSyntaxHandle, successHandle} = require('./baseAppHandlers');
const moduleName = 'test:node-utils';
let logger;
if (process.env.deployment === 'prd') {
	logger = nodeUtil.logger().new(moduleName);
} else {
	logger = nodeUtil.devLogger(moduleName);
}


const {app} = run(port);
const path = require('path');
const fs = require('fs');


const RouterDir = path.resolve(__dirname, 'appRouters');
const files = fs.readdirSync(RouterDir);


app.all('/', async (req, res) => {
	res.send(req.method);
});

for (const filename of files) {
	const routing = `/${trimExtName(filename)}`;
	console.log({routing});
	app.use(routing, require(path.resolve(RouterDir, filename)));
}

expressError(app, errorSyntaxHandle, logger);

const port = 4000;
const baseApp = require('../baseApp');
const helper = require('../helper');
const logger = require('khala-logger/log4js').consoleLogger('baseAppCase');
const {run, expressError} = baseApp;
const {trimExtName} = helper;
const {errorSyntaxHandle} = require('./baseAppHandlers');

const {app} = run(port);
const path = require('path');
const fs = require('fs');


const RouterDir = path.resolve(__dirname, 'appRouters');
const files = fs.readdirSync(RouterDir);


app.all('/', async (req, res) => {
	res.send(req.method);
});
app.get('/500', async (req, res) => {
	res.statsus(500);
});

for (const filename of files) {
	const routing = `/${trimExtName(filename)}`;
	logger.debug({routing});
	app.use(routing, require(path.resolve(RouterDir, filename)));
}

expressError(app, errorSyntaxHandle);

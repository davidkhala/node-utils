const port = 4000;
const {baseApp, helper} = require('../../index');
const {run, expressError} = baseApp;
const {trimExtName} = helper;
const {errorSyntaxHandle} = require('../baseAppHandlers');

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

expressError(app, errorSyntaxHandle);

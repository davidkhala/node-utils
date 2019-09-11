const port = 4012;
const nodeUtil = require('./index-pseudo');
const {run} = nodeUtil.baseApp;
const {app} = run(port);

app.all('/', async (req, res) => {
	res.send(req.method);
});



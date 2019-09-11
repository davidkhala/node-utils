const port = 4011;
const nodeUtil = require('../../index');
const {run} = nodeUtil.baseApp();
const {app} = run(port);

app.all('/', async (req, res) => {
	res.send(req.method);
});



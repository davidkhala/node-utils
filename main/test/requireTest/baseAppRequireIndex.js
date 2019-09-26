const port = 4011;
const {baseApp} = require('../../index');
const {run} = baseApp;
const {app} = run(port);

app.all('/', async (req, res) => {
	res.send(req.method);
});



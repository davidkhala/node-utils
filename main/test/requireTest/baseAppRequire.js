const port = 4010;
const {run} = require('../../baseApp');
const {app} = run(port);

app.all('/', async (req, res) => {
	res.send(req.method);
});



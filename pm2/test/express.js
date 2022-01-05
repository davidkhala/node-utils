import {run} from '@davidkhala/nodeutils/baseApp.js';
const {app} = run(3000);
app.get('/panic', async (req, res) => {
	throw Error('panic');
});
app.get('/', async (req, res) => {
	res.status(200);
	res.send('pong');
});
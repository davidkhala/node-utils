const {run} = require('khala-nodeutils/baseApp');
const {app} = run(3000);
app.get('/panic', async (req, res) => {
	throw Error('panic');
});
app.get('/', async (req, res) => {
	
});
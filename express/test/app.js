import {run} from '../index.js';
import {bind} from '../error.js';

const port = process.env.PORT || 80;

const {app} = run(port);
app.get('/', (req, res) => {
    console.info(`\n from ${req.ip}`);
    res.send('\npong\n');
});
bind(app);
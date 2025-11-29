import {run} from '../index.js'

describe('baseApp', function () {
    this.timeout(0)
    const start = (host) => {
        const port = 13000
        const {app, server} = run(port, host)

        app.get('/', (req, res) => {
            console.info(`\n from ${req.ip}`);
            res.send('\npong\n');
        });
        if (process.env.CI) {
            server.close()
        }
    }

    it('run', async () => {
        start()
    })
    it('run on localhost', async () => {
        start('localhost')
    })

})
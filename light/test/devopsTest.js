import {consoleLogger} from '@davidkhala/logger/log4.js';
import assert from 'assert';
import {homeResolve,} from '../path.js';
import {execStream, hostname, ip, tempdir, execSync, os, uid, homedir} from '../devOps.js';
import OS from 'os'
import Path from 'path'

const logger = consoleLogger('devops');

describe('devOps', function () {

    this.timeout(0);
    if (os.platform === 'linux' && !process.env.CI) {
        it('exec: apt update', () => {
            execSync('sudo apt update');
            // Test passed: sudo have interactive input
            // Test failed: on Oracle Linux 8
        });
    }

    it('execStream: npm i', () => {
        execStream('npm install');
    });
    it('tempdir', () => {
        logger.info({tempdir});
        switch (os.platform) {
            case 'win32':
                const {username, homedir} = OS.userInfo()
				console.debug({homedir})
                let expectedTEMPRoot = homedir
                if (username.length > 6) {
                    expectedTEMPRoot = homedir.replaceAll(username, `${username.toUpperCase()}~1`)
                }
                assert.equal(tempdir, Path.resolve(expectedTEMPRoot, 'AppData', 'Local', 'Temp'));
                break;
            case 'linux':
                assert.equal(tempdir, '/tmp');
        }

    });
    it('ip', () => {
        const address = ip(true);
        assert.ok(Array.isArray(address));
    });
    it('hostname', () => {
        logger.info({hostname});
    });
    it('os', () => {
        logger.info(os);
    });
    it('uid', () => {
        logger.info({uid});
    });
});


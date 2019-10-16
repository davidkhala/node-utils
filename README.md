# node-utils
nodejs utils to be published to npm as node_module

[![Build Status](https://travis-ci.com/davidkhala/node-utils.svg?branch=master)](https://travis-ci.com/davidkhala/node-utils)

follows [SEMVER](https://semver.org/)


## module lists
- khala-kvdb:   key-value data base abstract class
- khala-level:  leveldb toolset
- khala-logger: logger toolset 
- khala-pm2:    pm2 nodejs manager
- khala-nodeutils:  main
- khala-grpc
- khala-sequelize: nodejs ORM powered by npm sequelize 

## Performance

### Nodejs Memory usage
| Examples                      | Memory Usage (MB)     |
| ----                          |:----:                 |
| sleeping process (setTimeOut) | 35                    |
| http server (native implement)| 38                    |
| khala-nodeutils index         | 47 - 60               |
| khala-sequelize               | 41 - 49               |
| khala-sequelize + mysql connection instance| 56               |

## Notes

- `npm publish`
    - npm version increment: https://docs.npmjs.com/cli/version
    - npm user: `npm login`,  `npm whoami`
- no alternative readFileSync wrapper in fsExtra
- node popular date formatter library: https://stackabuse.com/how-to-format-dates-in-javascript/
- but the date formatter we are using is embedded provided. `date-format@^1.2.0`
- "[]" brackets around property name will indicates it is optional 
- TLS options:
    - [Nodejs 11+] `minVersion` set the minimum TLS version to allow. ['TLSv1.2', 'TLSv1.1', 'TLSv1']. Cannot be specified along with the secureProtocol option. It is not recommended to use less than TLSv1.2. Default: 'TLSv1'.
    - `secureProtocol` The TLS protocol version to use. [Option list:`secureProtocols`](./main/baseApp.js). It is not recommended to use TLS versions less than 1.2. Default: none
- node-gyp rebuild require `make` and `g++`
- npm install private package in docker image: https://docs.npmjs.com/docker-and-private-modules
## TODO
- try stressTest on sequenlize
- there is no automatic way to manage npm token explicitly
- build a light-weight https proxy server
- [Rush.js](https://github.com/Microsoft/web-build-tools/): for who build and publish many NPM packages at once.
- try [github package registry](https://help.github.com/en/articles/configuring-npm-for-use-with-github-package-registry)
- Redis的PUB/SUB机制, used to work as message queue
- add koa.js support as alternative of express.js

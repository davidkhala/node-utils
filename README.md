# node-utils
nodejs utils to be published to npm as node_module

[![Build Status](https://travis-ci.com/davidkhala/node-utils.svg?branch=master)](https://travis-ci.com/davidkhala/node-utils)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

follows [SEMVER](https://semver.org/)


## module lists
**Do not put syntax test in khala-nodeutils but in `test/syntaxTest.js`**
- khala-kvdb:   key-value data base abstract class
- khala-level:  leveldb toolset
- khala-logger: logger toolset 
- khala-pm2:    pm2 nodejs manager
- khala-nodeutils:  main
- khala-grpc
- khala-sequelize: nodejs ORM powered by npm sequelize 

## Notes
- [NPM notes](./npm.md)
- [jsDoc notes](./jsdoc.md)
- [TypeScript notes](./typeScript.md)
- Ternary Operator in some case could be simplified as 
    `a = a ? a : b` => `a = a || b` 
- TLS options:
    - [Nodejs 11+] `minVersion` set the minimum TLS version to allow. ['TLSv1.2', 'TLSv1.1', 'TLSv1']. Cannot be specified along with the secureProtocol option. It is not recommended to use less than TLSv1.2. Default: 'TLSv1'.
    - `secureProtocol` The TLS protocol version to use. [Option list:`secureProtocols`](./main/baseApp.js). It is not recommended to use TLS versions less than 1.2. Default: none
- node-gyp rebuild require `make` and `g++`
- console.log() accepts three format characters, `%s` => `string`, `%d` => `integer`, and `%j` => `JSON data`

## TODO
- Bump to latest nodejs LTS: 14.x
- try stressTest on sequenlize
- build a light-weight https proxy server
- Redis的PUB/SUB机制, used to work as message queue
- Evaluate [experimental:ECMA modules](https://nodejs.org/docs/latest-v12.x/api/esm.html#esm_ecmascript_modules)


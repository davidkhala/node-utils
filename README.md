# node-utils
nodejs utils to be published to npm as node_module

follows [SEMVER](https://semver.org/)


## module lists
- khala-kvdb:   key-value data base abstract class
- khala-level:  leveldb toolset
- khala-logger: logger toolset 
- khala-pm2:    pm2 nodejs manager
- khala-nodeutils:  main
- khala-grpc


## disc usage

Total: 11M
- express:  2.9M
- js-yaml:  1.1M
- request:  5.9M
    - superagent:   2.4M
    - got:          760K 
    - axios:        644K
- winston:  776K
- log4js:   6.7M    (dev)


# Notes
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
# TODO

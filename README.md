# node-utils
nodejs utils to be published to npm as node_module

follows [SEMVER](https://semver.org/)


## module lists
- khala-kvdb:   key-value data base abstract class
- khala-level:  leveldb toolset
- khala-logger: logger toolset 
- khala-pm2:    pm2 nodejs manager
- khala-nodeutils:  main

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

# TODO

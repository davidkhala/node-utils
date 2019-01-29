# node-utils
nodejs utils to be published to npm as node_module

follows SEMVER[https://semver.org/]

# Notes
- `npm publish`
    - npm version increment: https://docs.npmjs.com/cli/version
    - npm user: `npm login`,  `npm whoami`
- no alternative readFileSync wrapper in fsExtra
- node popular date formatter library: https://stackabuse.com/how-to-format-dates-in-javascript/
- but the date formatter we are using is embedded provided. `date-format@^1.2.0`

- winstonJS size: 776K    log4j size: 6.7M

# TODO
- `du -sh` of node_modules have a record of 61M
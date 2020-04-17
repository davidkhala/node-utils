# khala-nodeutils

[![NPM](https://nodei.co/npm/khala-nodeutils.png)](https://nodei.co/npm/khala-nodeutils/)

Main toolset



## Notes
- node popular [date formatter library](https://stackabuse.com/how-to-format-dates-in-javascript/)
    - we use npm `date-format` 
- request.js is deprecated, we use axios as alternative 
    - See in [Author post](https://github.com/request/request/issues/3142)
      and [recommended alternatives](https://github.com/request/request/issues/3143)
- no alternative readFileSync wrapper in fsExtra
### Disc Usage
Total: 11M
- express:  2.9M
- js-yaml:  1.1M
- request:  5.9M
    - superagent:   2.4M
    - got:          760K 
    - axios:        644K
- winston:  776K
- log4js:   6.7M    (dev)

## TODO
- add koa.js support as alternative of express.js

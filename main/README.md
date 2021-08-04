# khala-nodeutils
Nodejs utils including date-format, express.js and tmp file manager

[![NPM](https://nodei.co/npm/khala-nodeutils.png)](https://nodei.co/npm/khala-nodeutils/)



## Notes
- node popular [date formatter library](https://stackabuse.com/how-to-format-dates-in-javascript/)
    - we use npm `date-format` 
- request.js is deprecated, we use axios as alternative 
    - See in [Author post](https://github.com/request/request/issues/3142)
      and [recommended alternatives](https://github.com/request/request/issues/3143)
- no alternative readFileSync wrapper in fsExtra

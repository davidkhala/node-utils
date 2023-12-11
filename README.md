# node-utils
nodejs utils to be published to npm as node_module


## Notes
- [NPM notes](./npm.md)
- [jsDoc notes](./jsdoc.md)
- [TypeScript notes](./typeScript.md)
- TLS options:
    - [Nodejs 11+] `minVersion` set the minimum TLS version to allow. ['TLSv1.2', 'TLSv1.1', 'TLSv1']. Cannot be specified along with the secureProtocol option. It is not recommended to use less than TLSv1.2. Default: 'TLSv1'.
    - `secureProtocol` The TLS protocol version to use. [Option list:`secureProtocols`](./main/baseApp.js). It is not recommended to use TLS versions less than 1.2. Default: none
- node-gyp rebuild require `make` and `g++`

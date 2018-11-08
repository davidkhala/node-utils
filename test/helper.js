const Helper = require('../helper');
const relPath = Helper.homeResolve("abc");
console.log(relPath);
const path = require('path');
console.log(path.resolve('~'))
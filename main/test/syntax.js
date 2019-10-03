const Syntax = require('../syntax');
const str = ` 
/home/davidliu/Documents/delphi-fabric/common/bin/configtxlator 
start \
--hostname=0.0.0.0 
--port=7059  
--CORS=* `;
const tokens = Syntax.splitBySpace(str);
console.log('syntax test', tokens);
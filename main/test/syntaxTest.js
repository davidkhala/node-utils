const SyntaxTest = require('../syntax');
const logger = require('../.').devLogger('syntax test');
const str = ` 
/home/davidliu/Documents/delphi-fabric/common/bin/configtxlator 
start \
--hostname=0.0.0.0 
--port=7059  
--CORS=* `;
const tokens = SyntaxTest.splitBySpace(str);
logger.debug(tokens);
const obj = {
	a: {
		entry: 'b'
	}
};
const {a} = obj;
a.entry = 'c';
logger.debug(obj);
let {entry} = a;
entry = 'd';
logger.debug(obj);

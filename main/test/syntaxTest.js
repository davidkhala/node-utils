/**
 * Do not put syntax test here but in `test/syntaxTest.js`**
 */
const Syntax = require('../syntax');
const logger = require('khala-logger/dev').devLogger('syntax test');
const splitBySpaceTest = () => {
	const str = ` 
/home/davidliu/Documents/delphi-fabric/common/bin/configtxlator 
start \
--hostname=0.0.0.0 
--port=7059  
--CORS=* `;
	const tokens = Syntax.splitBySpace(str);
	logger.debug(tokens);
};

const task = () => {
	splitBySpaceTest();
};

task();


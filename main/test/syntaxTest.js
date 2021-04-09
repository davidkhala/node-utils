/**
 * Do not put syntax test here but in `test/syntaxTest.js`**
 */
const Syntax = require('../syntax');
const logger = require('khala-logger/log4js').consoleLogger('syntax test');

describe('test:syntax', () => {
	it('splitBySpace', () => {
		const str = ` 
/home/davidliu/Documents/delphi-fabric/common/bin/configtxlator 
start \
--hostname=0.0.0.0 
--port=7059  
--CORS=* `;
		const tokens = Syntax.splitBySpace(str);
		logger.debug(tokens);
	});
});



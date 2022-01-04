import {splitBySpace} from '../syntax.js';
import {consoleLogger} from '@davidkhala/logger/log4.js';
const logger = consoleLogger('syntax test');

describe('test:syntax', () => {
	it('splitBySpace', () => {
		const str = ` 
/home/davidliu/Documents/delphi-fabric/common/bin/configtxlator 
start \
--hostname=0.0.0.0 
--port=7059  
--CORS=* `;
		const tokens = splitBySpace(str);
		logger.debug(tokens);
	});
});



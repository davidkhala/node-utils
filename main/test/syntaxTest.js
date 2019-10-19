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
const objectAssignTest = () => {
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
};
const util = require('util');
const JSONStringfyTest = () => {
	const complexObj = {
		a: 'b',
		next: this.next
	};

	console.log(JSON.stringify(complexObj));
	console.log(util.format('%j', complexObj));
};
const task = () => {
	splitBySpaceTest();
	objectAssignTest();
	JSONStringfyTest();
};

// task();
JSONStringfyTest();


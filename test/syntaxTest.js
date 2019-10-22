const logger = console;
const fs = require('fs');
const path = require('path');
const util = require('util');
const testArrowFunction = async () => {
	class TestClass {
		async p() {
			return new Promise(resolve => {
				logger.debug('this', this);
				resolve();
			});
		}
	}

	const testObj = new TestClass();
	await testObj.p();
};
const bufferTest = (obj) => {
	const bytes = Buffer.from(JSON.stringify(obj));
	logger.info(typeof obj, obj, 'stringify to', JSON.stringify(obj));
	logger.info(bytes.toString());
};
const bufferNumTest = () => {
	try {
		Buffer.from(11);
		logger.error('assert fail: Buffer.from(number)');
	} catch (e) {
		logger.info(Buffer.from, e.message);
	}
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

const JSONStringifyTest = () => {
	const complexObj = {
		a: 'b'
	};
	complexObj.this = complexObj;
	try {
		console.log(JSON.stringify(complexObj));
	} catch (e) {
		logger.error('in JSON.stringify...');
		logger.error(e);
	}

	try {
		console.log(util.format('%j', complexObj));
	} catch (e) {
		logger.error('in util.format...');
		logger.error(e);
	}

};
const testClass = () => {
	class A {
		constructor() {
			this.p = 'a';
		}

		foo() {

		}
	}

	const a = new A();
	logger.info('function will not be displayed', Object.keys(a));

};

const testReadDir = () => {
	try {
		fs.readFileSync(__dirname).toString();
	} catch (e) {
		logger.error(e);
	}
};

const loadObjectTest = () => {
	let files = fs.readdirSync(__dirname);
	files = files.filter(name => name !== 'index.js' && name !== path.basename(__filename));
	for (const file of files) {
		const object = require(`./${file}`);
		logger.debug(file, object);
	}
};
const forTest = () => {
	const obj = {a: 'b'};
	try {
		for (const value of obj) {
			console.log({value});
		}
	} catch (e) {
		logger.info('error expected: TypeError: obj is not iterable');
		logger.info(e);
	}

};
const task = async () => {
	await testArrowFunction();
	testClass();
	bufferTest({david: 'liu'});
	bufferTest('liu');
	bufferTest(123);
	testReadDir();
	loadObjectTest();
	objectAssignTest();
	JSONStringifyTest();
	bufferNumTest();
	forTest();
};
task();




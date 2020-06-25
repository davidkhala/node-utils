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

const JSONStringifyTest = () => {
	const complexObj = {
		a: 'b'
	};
	complexObj.this = complexObj;
	try {
		JSON.stringify(complexObj);
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
const keyTest = () => {
	const obj = {undefined: 'b'};
	for (const [key, value] of Object.entries(obj)) {
		console.log({key, value});
	}
};
describe('syntax test', () => {
	it('arrow function', async () => {
		await testArrowFunction();
	});
	it('class', () => {
		class A {
			constructor() {
				this.p = 'a';
			}

			foo() {

			}
		}

		const a = new A();
		logger.info('function will not be displayed', Object.keys(a));
	});
	it('util.inspect()', () => {
		util.inspect({a: 'abc'});
		util.inspect('abc');
	});
	it('buffer', () => {
		bufferTest({david: 'liu'});
		bufferTest('liu');
		bufferTest(123);
		bufferNumTest();
	});
	it('read dir', () => {
		try {
			fs.readFileSync(__dirname).toString();
		} catch (e) {
			logger.error(e);
		}

	});
	it('auto require', () => {
		loadObjectTest();
	});
	it('Object assign', () => {
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
		Object.assign(obj, {a: null});
		logger.debug(obj);
	});
	it('JSON', () => {
		JSONStringifyTest();
	});
	it('for loop', () => {
		forTest();
		keyTest();
	});

});





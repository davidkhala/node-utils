const logger = console;
const fs = require('fs');
const path = require('path');
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
const tests = async () => {
	await testArrowFunction();
	testClass();
	bufferTest({david: 'liu'});
	bufferTest('liu');
	bufferTest(123);
	testReadDir();
};

const loadObjectTest = () => {
	let files = fs.readdirSync(__dirname);
	files = files.filter(name => name !== 'index.js' && name !== path.basename(__filename));
	for (const file of files) {
		const object = require(`./${file}`);
		logger.debug(file, object);
	}
};
loadObjectTest();
// tests();




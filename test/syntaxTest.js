const logger = console;
const fs = require('fs');
const path = require('path');
const util = require('util');
const assert = require('assert');
const bufferTest = (obj) => {
	const bytes = Buffer.from(JSON.stringify(obj));
	logger.info(typeof obj, obj, 'stringify to', JSON.stringify(obj));
	logger.info(bytes.toString());
};

describe('syntax test', () => {
	it('arrow function', async () => {
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
		try {
			Buffer.from(11);
			assert.fail('assert fail: Buffer.from(number)');
		} catch (e) {
			assert.ok(e.message.match(/The "value" argument must not be of type number. Received type number/));
		}
	});
	it('read dir', () => {
		try {
			fs.readFileSync(__dirname).toString();
		} catch (e) {
			assert.strictEqual(e.message, 'EISDIR: illegal operation on a directory, read');
		}

	});
	it('auto require', () => {
		let files = fs.readdirSync(__dirname);
		files = files.filter(name => name.endsWith('.js') && name !== path.basename(__filename));
		for (const file of files) {
			const object = require(`./${file}`);
			logger.debug(file, object);
		}
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
		const assignResult = Object.assign(obj, {a: null});
		logger.debug(obj, assignResult);
	});
	it('JSON', () => {
		const complexObj = {
			a: 'b'
		};
		complexObj.this = complexObj;
		try {
			JSON.stringify(complexObj);
		} catch (e) {
			assert.strictEqual(e.message, 'Converting circular structure to JSON');
		}

		console.info(util.format('%j', complexObj));
	});
	it('for loop', () => {
		const obj = {a: 'b'};
		try {
			for (const value of obj) {
				console.log({value});
			}
		} catch (e) {

			assert.strictEqual(e.message, 'obj is not iterable');
		}
	});
	it('test:key', () => {
		const obj = {undefined: 'b'};
		for (const [key, value] of Object.entries(obj)) {
			console.log({key, value});
		}
	});
	it('test:error', () => {
		try {
			throw Error('abc');
		} catch (err) {
			logger.debug(err);
			logger.debug('err.code', err.code);
			logger.debug('err.message', err.message);
			logger.debug('err.stack', err.stack);
			logger.error(err.toString());
		}
	});
	it('test: promise', async () => {
		const p = new Promise((resolve, reject) => {
			const timer = setTimeout(() => {
				clearTimeout(timer);
				reject(new Error('123'));
			}, 1000);

		});
		try {
			await p;
		} catch (e) {
			assert.strictEqual(e.message, '123');
		}
	});


});





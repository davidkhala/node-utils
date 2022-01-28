const logger = console;
import fs from 'fs';
import util from 'util';
import assert from 'assert';
import {filedirname} from '../light/es6.mjs';
filedirname(import.meta)
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
			const regExp = /^The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received type number/;
			assert.match(e.message, regExp);
		}
	});
	it('read dir', () => {
		try {
			fs.readFileSync(__dirname).toString();
		} catch (e) {
			assert.strictEqual(e.message, 'EISDIR: illegal operation on a directory, read');
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
			assert.match(e.message, /^Converting circular structure to JSON/);
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
	it('assert is an exception', async () => {

		try {
			assert.fail();
		} catch (e) {
			assert.ok(e instanceof assert.AssertionError);
			console.error(e);
		}

	});


});





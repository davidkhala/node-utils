const testArrowFunction = async () => {
	class TestClass {
		async p() {
			return new Promise(resolve => {
				console.debug('this', this);
				resolve();
			});
		}
	}

	const testObj = new TestClass();
	await testObj.p();
};
const bufferTest = (obj) => {
	const bytes = Buffer.from(JSON.stringify(obj));
	console.log(bytes.toString());
};

const testClass = () => {
	class A {
		constructor() {
			this.p = "a";
		}

		foo() {

		}
	}

	const a = new A();
	console.log('function will not be displayed', Object.keys(a));

};

const tests = async () => {
	await testArrowFunction();
	bufferTest({david: 'liu'});
	bufferTest('liu');

};

// tests();
testClass();

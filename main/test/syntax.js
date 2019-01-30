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


const tests = async () => {
	await testArrowFunction();
	bufferTest({david: 'liu'});
	bufferTest('liu');

};
tests();

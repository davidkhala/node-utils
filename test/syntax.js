class TestClass {
	async p() {
		return new Promise(resolve => {
			console.debug('this', this);
			resolve();
		});
	}
}

const testObj = new TestClass();
testObj.p();
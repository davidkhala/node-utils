const p = new Promise((resolve, reject) => {
	const timer = setTimeout(() => {
		clearTimeout(timer);
		reject(new Error(123));
	}, 1000);

});
const task = async () => {
	await p;
};
task();

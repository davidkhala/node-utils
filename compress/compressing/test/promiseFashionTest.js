const Compress = require('../index');
const compress = new Compress();
const source = Buffer.from('abc');
const dest = 'abc';
const task = async () => {
	switch (parseInt(process.env.taskID)) {
		case 0:
			await compress.compressFile(source, dest);
			break;
		case 1:
			break;
	}

};
task();

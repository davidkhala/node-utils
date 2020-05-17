const compress = require('compressing');

const path = require('path');

const task = async () => {
	switch (parseInt(process.env.taskID)) {
		case 0: {
			// taskID=0 node promiseFashionTest.js
			const src = path.resolve(__dirname, 'material');
			const dest = 'dir.tar.gz';
			await compress.tar.compressDir(src, dest);
		}
			break;
		case 1: {
			const src = path.resolve(__dirname, 'dir.tar.gz');
			const dest = path.resolve(__dirname);
			await compress.tar.uncompress(src, dest);
		}
			break;
	}

};
task();

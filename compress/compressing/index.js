const compressing = require('compressing');

/**
 * TODO WIP
 */
class Compress {
	/**
	 *
	 * @param {string | Buffer | ReadStream} source The source could be of type Buffer, file path or stream
	 */
	async compressFile(source, dest) {
		await compressing.gzip.compressFile(source, dest);
	}

	async uncompressFile(source, dest) {
		await compressing.gzip.uncompress(source, dest);
	}

}

module.exports = Compress;



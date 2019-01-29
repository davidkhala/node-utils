const Level = require('level');
const {DBInterface} = require('khala-nodeutils').kvDB();

class LevelDB extends DBInterface {
	constructor(path) {
		super({name: path});
	}

	async run() {
		this.connection = Level(this.name);
	}

	async _connectBuilder() {
		await this.connection.open();
		return this.connection;
	}

	async set(key, value) {
		return this.connection.put(key, value);
	}

	isOpen() {
		return this.connection.isOpen();
	}

	async disconnect() {
		await this.connection.close();
	}

	async get(key) {
		return this.connection.get(key);
	}

	async list(opts, onClose) {
		opts = LevelDB.optionsBuilder(opts);
		if (typeof onClose !== 'function') {
			onClose = () => {
			};
		}
		return new Promise((resolve, reject) => {
			const results = [];
			this.connection.createReadStream(opts)
				.on('data', ({key, value}) => {
					results.push({key, value});
				})
				.on('error', (err) => {
					reject(err);
				})
				.on('close', onClose)
				.on('end', () => {
					resolve(results);
				});
		});

	}

	static optionsBuilder({gt, gte, lt, lte, reverse, limit, keys, values} = {
		reverse: false,
		limit: -1,
		keys: true,
		values: true
	}) {
		return {gt, gte, lt, lte, reverse, limit, keys, values};
	}
}


module.exports = LevelDB;

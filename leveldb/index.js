const Level = require('level');
const {DBInterface} = require('khala-kvdb');

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


	async disconnect() {
		await this.connection.close();
	}

	async get(key) {
		return this.connection.get(key);
	}

	static async _next(iterator) {
		return new Promise((resolve, reject) => {
			iterator.next((err, key, value) => {
				if (err) {
					return reject(err);
				}
				resolve({key, value});
			});
		});
	}

	static async _end(iterator) {
		return new Promise((resolve, reject) => {
			iterator.end((err) => {
				if (err) {
					return reject(err);
				}
				resolve();
			});
		});
	}

	async list(opts) {

		const iterator = this.connection.iterator(opts);
		const results = [];
		const getNext = async () => {
			const {key, value} = await LevelDB._next(iterator);
			if (key) {
				results.push({key, value});
				await getNext();
			}
		};
		try {
			await getNext();
			return results;
		} finally {
			await LevelDB._end(iterator);
		}
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

class dbInterface {
	constructor({url, port, name}) {
		this.url = url;
		this.name = name;
		this.port = port;
	}

	async get(key) {
		throw Error(`get(${key}) to be implement`);
	}

	async set(key, value) {
		return value;
	}

	async connect() {
		if (!this.connection) {
			await this.run();
			this.connection = await this._connectBuilder();
		}
		return this.connection;
	}

	async run() {
		throw Error('run() to be implement');
	}

	async clear() {
		throw Error('clear() to be implement');
	}

	async _connectBuilder() {
		throw Error('_connectBuilder() to be implement');
	}
}

exports.DBInterface = dbInterface;
const {MongoClient} = require('mongodb');

class MongoConnect {
	/**
	 *
	 * @param domain
	 * @param username
	 * @param password
	 * @param [dbName] if not specified, specify in {@link connect}
	 */
	constructor(domain, username, password, dbName) {
		const uri = `mongodb+srv://${username}:${password}@${domain}/${dbName}?retryWrites=true&w=majority`;
		this.dbName = dbName;
		this.client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
	}

	async connect(dbName) {
		if (this.dbName) {
			dbName = this.dbName;
		}
		const {client} = this;
		await client.connect();
		this.db = client.db(dbName);

	}

	/**
	 *
	 * @param {boolean} [nameOnly]
	 * @return {Promise<(Pick<CollectionInfo, "name" | "type"> | CollectionInfo)[]|string[]>}
	 */
	async listCollections(nameOnly) {
		const collections = await this.db.listCollections().toArray();
		if (nameOnly) {
			return collections.map(({name}) => name);
		}
		return collections;
	}

	disconnect() {
		this.client.close();
	}

}

module.exports = MongoConnect;


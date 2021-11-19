const {MongoClient} = require('mongodb');

// Enable Mutual TLS (mTLS) Authentication: TLS connections allow you to connect to your Autonomous Database without a wallet

class AutonomousJSON {
	constructor({username = 'ADMIN', password, domain}, tls) {
		const uri = `mongodb://${username}:${password}@${domain}:27016/${username}?authMechanism=PLAIN&authSource=$external${tls ? '&ssl=true' : ''}`;
		this.client = new MongoClient(uri);
	}

	async connect() {
		const {client} = this;
		await client.connect();
		this.db = client.db();
	}

	async disconnect() {
		await this.client.close();
		delete this.db;
	}
}

module.exports = AutonomousJSON;

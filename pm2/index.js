const pm2 = require('pm2');
const logger = require('khala-logger/log4js').consoleLogger('pm2 Manager');
const fs = require('fs');

class PM2 {
	constructor() {

	}

	async connect() {
		await new Promise((resolve, reject) => {
			pm2.connect(err => {
				if (err) {
					reject(err);
				}
				resolve();
			});
		});
		return this;
	}

	disconnect() {
		pm2.disconnect();
	}

	async run({name, script, env}) {
		let process = await this.get(name);
		if (process) {
			logger.warn(`process ${name} exist`);
		} else {
			if (!fs.existsSync(script)) {
				throw Error(`invalid script path ${script}`);
			}
			process = await new Promise((resolve, reject) => {
				pm2.start({name, script, env}, (err, Proc) => {
					if (err) {
						logger.error(err);
						reject(err);
					}
					resolve(Proc);
				});
			});
			logger.info(`process ${name} started`, script);
		}
		return process;
	}

	async reRun({name, script, env}) {
		await this.delete({name});
		return await this.run({name, script, env});
	}

	async delete(name) {
		const process = await this.get(name);
		if (!process) {
			logger.warn(`process ${name} not exist, delete skipped`);
		} else {
			await new Promise((resolve, reject) => {
				pm2.delete(name, (err) => {
					if (err) {
						reject(err);
					}
					resolve();
				});
			});
			logger.info(`process ${name} deleted`);
		}
		return process;
	}

	async list() {
		return await new Promise((resolve, reject) => {
			pm2.list((err, list) => {
				if (err) {
					reject(err);
				}
				resolve(list);
			});
		});
	}

	async get(name) {
		const list = await this.list();
		return list.find(({name: pName}) => pName === name);
	}
}

module.exports = {
	PM2
};

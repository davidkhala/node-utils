import pm2 from 'pm2';
import {consoleLogger} from '@davidkhala/logger/log4.js';

const logger = consoleLogger('pm2 Manager');
import fs from 'fs';

export class PM2 {
	constructor() {

	}

	async connect() {
		await new Promise((resolve, reject) => {
			pm2.connect(err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}

			});
		});
		return this;
	}

	disconnect() {
		pm2.disconnect();
	}

	async run({name, script, env}) {
		const processList = await this.get(name);
		if (processList) {
			logger.warn(`process ${name} exist`);
		} else {
			if (!fs.existsSync(script)) {
				throw Error(`invalid script path ${script}`);
			}
			const process = await new Promise((resolve, reject) => {
				pm2.start({name, script, env}, (err, Proc) => {
					if (err) {
						logger.error(err);
						reject(err);

					} else {
						resolve(Proc);
					}
				});
			});
			logger.info(`process ${name} started`, script);
			return process;
		}
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
					} else {
						resolve();
					}
				});
			});
			logger.info(`process ${name} deleted`);
		}
		return process;
	}

	async list() {
		return new Promise((resolve, reject) => {
			pm2.list((err, list) => {
				if (err) {
					reject(err);
				} else {
					resolve(list);
				}
			});
		});
	}

	/**
	 * @param name Can either be the name or process id
	 * @param [verbose]
	 * @return Promise<undefined|[]> if not found, return undefined, otherwise return a list of all matching results
	 */
	async get(name, verbose) {

		const descList = await new Promise((resolve, reject) => {
			pm2.describe(name, (err, list) => {
				if (err) {
					reject(err);
				} else {
					resolve(list);
				}
			});
		});

		if (descList.length > 0) {
			if (!verbose) {
				return descList.map(desc => {
					delete desc.pm2_env;
					return desc;
				});
			}
			return descList;
		}
	}
}

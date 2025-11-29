export async function sleep(ms, logger = console) {
	if (logger) {
		logger.debug(`sleep ${ms}ms`);
	}
	return new Promise(resolve => setTimeout(resolve, ms));
}

export async function looper (task, opts, ...taskParams) {
	const {times, interval=1000} = opts;

	if (Number.isInteger(times)) {
		for (let i = 0; i < times; i++) {
			await task(...taskParams);
			await sleep(interval);
		}
	} else {
		await task(...taskParams);
		await sleep(interval);
		await looper(opts, task, ...taskParams);
	}
}
export async function sleep(ms, logger = console) {
	if (logger) {
		logger.debug(`sleep ${ms}ms`);
	}
	return new Promise(resolve => setTimeout(resolve, ms));
}

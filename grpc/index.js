import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

export const load = (protoPath, options) => {

	const definition = protoLoader.loadSync(protoPath, options);
	const object = grpc.loadPackageDefinition(definition);
	return {
		definition,
		object
	};
};
/**
 *
 * @param {integer|intString} port
 * @param {string} [host] default to allow all inbound traffic
 * @param logger
 * @param services
 * @param {ServerCredentials} creds
 */
export const grpcServer = async ({port, host = '0.0.0.0', logger = console}, services = [], creds = grpc.ServerCredentials.createInsecure()) => {
	const server = new grpc.Server();

	for (const {service, implementation} of services) {
		server.addService(service, implementation);
	}
	return new Promise((resolve, reject) => {
		const callback = (error, PORT) => {
			if (error) {
				reject(error);
			}
			server.start();
			logger.info('Server running at', {PORT});
			resolve(PORT);
		};
		server.bindAsync(`${host}:${port}`, creds, callback);
	});

};


export const grpcRequest = async (protoPath, serviceName, url, actionName, body, creds = grpc.credentials.createInsecure()) => {
	const Service = load(protoPath).object[serviceName];
	const client = new Service(url, creds);
	return new Promise((resolve, reject) => {
		client[actionName](body, (err, res) => {
			if (err) {
				reject(err);
			} else {
				resolve(res);
			}
		});
	});
};
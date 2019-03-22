const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

exports.load = (protoPath, options) => {

	const definition = protoLoader.loadSync(protoPath, options);
	const object = grpc.loadPackageDefinition(definition);
	return {
		definition,
		object
	};
};

exports.grpcServer = (baseUrl, services = [], creds = grpc.ServerCredentials.createInsecure()) => {
	const server = new grpc.Server();

	for (const {service, implementation} of services) {
		server.addService(service, implementation);
	}
	server.bind(baseUrl, creds);
	server.start();

};


exports.grpcRequest = async (protoPath, serviceName, url, actionName, body, creds = grpc.credentials.createInsecure()) => {
	const Service = load(protoPath)[serviceName];
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
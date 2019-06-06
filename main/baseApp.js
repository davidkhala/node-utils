const express = require('express');
const logger = require('khala-logger').new('express server');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const cors = require('cors');
const fs = require('fs');
const {isPath} = require('./format');
const Multer = require('multer');
/**
 * @type {string[]} minVersion: set the minimum TLS version to allow. Cannot be specified along with the secureProtocol option.
 * It is not recommended to use less than TLSv1.2.
 * Default: 'TLSv1'
 * Introduced in Nodejs 11
 */
const minVersions = ['TLSv1', 'TLSv1.1', 'TLSv1.2'];
/**
 *
 * @type {string[]} secureProtocol The TLS protocol version to use.
 * The possible values are listed as [SSL_METHODS](https://www.openssl.org/docs/man1.1.0/man7/ssl.html#Dealing-with-Protocol-Methods), use the function names as strings.
 * It is not recommended to use TLS versions less than 1.2.
 * Default: none.
 */
const secureProtocols = [
	'TLS_method',
	'TLS_client_method',
	'TLS_server_method',
	'TLSv1_2_method',
	'TLSv1_2_client_method',
	'TLSv1_2_server_method',
	'TLSv1_1_method',
	'TLSv1_1_client_method',
	'TLSv1_1_server_method',
	'TLSv1_method',
	'TLSv1_client_method',
	'TLSv1_server_method',
	'SSLv3_method',
	'SSLv3_client_method',
	'SSLv3_server_method'
];

exports.httpsOptions = {
	minVersion: minVersions,
	secureProtocol: secureProtocols
};
/**
 * @param port
 * @param host if specified, the access point is limited to host
 * @param tlsOptions
 * @returns {{app: express app, server: *}}
 */
exports.run = (port, host, tlsOptions) => {
	const app = express();

	app.options('*', cors());
	app.use(cors());
	app.use(bodyParser.json());

	app.use(bodyParser.urlencoded({
		extended: true// req.body will contain key-value pairs, extended=false: value can be a string or array; extended=true: value can be any type
	}));
	let server;
	if (tlsOptions) {
		const {key, cert, ca, requestCert} = tlsOptions;

		tlsOptions.key = isPath(key) ? fs.readFileSync(key) : key;
		tlsOptions.cert = isPath(cert) ? fs.readFileSync(cert) : cert;
		tlsOptions.ca = isPath(ca) ? fs.readFileSync(ca) : ca;

		server = https.createServer(tlsOptions, app).listen(port, () => {
			logger.info('https server started at', {host, port, cert, ca, requestCert});
		});
	} else {
		server = http.createServer(app).listen(port, host, () => {
			logger.info('http server started at', {host, port});
		});
	}

	server.timeout = 240000;
	return {app, server};
};
exports.getRouter = () => {
	return express.Router();
};
exports.expressError = (app, onError, logger = console) => {
	if (!onError) {
		onError = (err, res) => {
			let status = 500;
			if (err.statusCode) {
				status = err.statusCode;
			} else if (err.status) {
				status = err.status;
			}
			res.status(status);
			res.send(err);
		};
	}
	app.use((err, req, res, next) => {
		logger.error(err);
		if (res.headersSent) {
			logger.error(`error happened after res.headersSent=${res.headersSent}`);
			return next(err);
		}
		onError(err, res);
	});
};
exports.formDataRouter = (cacheDir, properties = []) => {
	const multerCache = Multer({dest: cacheDir});
	return multerCache.fields(properties.map(name => ({name})));
};
exports.formDataFilePaths = (req, property) => {
	return req.files[property].map(({path}) => path);
};
exports.express = express;
exports.multer = Multer;

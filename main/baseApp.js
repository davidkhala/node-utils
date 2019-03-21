const express = require('express');
const logger = require('khala-logger').new('express server');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('https');
const cors = require('cors');
const fs = require('fs');
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
		extended: false
	}));
	let server;
	if (tlsOptions) {
		const {key, cert, ca, requestCert = false} = tlsOptions;

		server = https.createServer({
			key: fs.readFileSync(key),
			cert: fs.readFileSync(cert),
			ca: fs.readFileSync(ca),
			requestCert
		}, app).listen(port, () => {
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

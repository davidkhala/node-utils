import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import cors from 'cors';
import fs from 'fs';
import {isPath} from '@davidkhala/light/path.js';
import Multer from 'multer';

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

export const httpsOptions = {
    minVersion: minVersions,
    secureProtocol: secureProtocols
};

/**
 * net.Server
 * @typedef {Server|http.Server|https.Server} Server
 */
/**
 * @param port
 * @param [host] if specified, the access point is limited to host
 * @param [tlsOptions]
 * @param [logger]
 * @returns {{app: Express, server: Server}}
 */
export const run = (port, host, tlsOptions, logger = console) => {
    const app = express();

    if (!host) {
        app.use(cors());
    }

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

        server = https.createServer(tlsOptions, app).listen(port, host, (error) => {
            if (error) {
                throw error
            }
            logger.info('https server started at', {host, port, cert, ca, requestCert});
        });
    } else {
        server = http.createServer(app).listen(port, host, (error) => {
            if (error) {
                throw error
            }
            logger.info('http server started at', {host, port});
        });
    }

    server.timeout = 240000;
    return {app, server};
};
export const getRouter = () => {
    return express.Router();
};
export const expressError = (app, onError, logger = console) => {
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
export const formDataRouter = (cacheDir, fileSize) => {
    const options = {
        dest: cacheDir,
        limits: {}
    };

    if (Number.isInteger(fileSize) && fileSize > 0) {
        options.limits.fileSize = fileSize; // Compliant value: 8000000
    }

    const multerCache = Multer(options);
    return multerCache.any();
};
export const formDataFilePaths = (req, property) => {
    return req.files[property].map(({path}) => path);
};

import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import cors from 'cors';
import fs from 'fs';
import {isPath} from '@davidkhala/light/path.js';


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
export function run(port, host, tlsOptions, logger = console) {
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
export const getRouter = express.Router




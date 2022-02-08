#!/usr/bin/env node
import {grpcServer, load} from '../index.js';
import path from 'path';
import {filedirname} from '@davidkhala/light/es6.mjs';
filedirname(import.meta)
const pingProtoPath = path.resolve(__dirname, 'ping.proto');
const {PingService: {service}} = load(pingProtoPath).object;
const port = 9090;

const services = [{
	service,
	implementation: {
		ping: (req, callBack) => {
			const err = undefined;
			callBack(err, {data: 'pong', errCode: 'success'});
		}
	}
}];

grpcServer({port}, services);




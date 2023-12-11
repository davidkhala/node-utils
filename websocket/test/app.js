import {run} from '@davidkhala/nodeutils/baseApp.js';
import WebsocketServer from '../server.js';

const {server} = run(3003);
const ws = new WebsocketServer(server);
ws.setHeartBeat(500);

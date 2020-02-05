const {run} = require('khala-nodeutils/baseApp');
const WebsocketServer = require('../server');
const {server} = run(3003);
const ws = new WebsocketServer(server);
ws.setHeartBeat(500);

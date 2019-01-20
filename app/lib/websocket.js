const WsServer = require('websocket').server;
const http = require('http');
const logger = require("./logger");

function WebSocketServer() {};

class WebSocketServerClass {
    constructor(port) {
        this.logger = new logger("websocket");
        this.httpServer = http.createServer();
        this.httpServer.listen(port, () => {
            this.logger.log("WS003", {port: port});
        });
        this.wsServer = new WsServer({
            httpServer: this.httpServer,
            autoAcceptConnections: false
        });
    };
}
let ws = new WebSocketServerClass(9000);

module.exports = WebSocketServer;
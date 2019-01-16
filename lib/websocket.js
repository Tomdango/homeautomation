const WsServer = require('websocket').server;
const http = require('http');

function WebSocketServer() {};

WebSocketServer.prototype.startServer = () => {
    WebSocketServer.prototype.httpServer = http.createServer((request, response) => {
        console.log(`${new Date()} Received Request for ${request.url}.`);
    });
    WebSocketServer.prototype.httpServer.listen(process.env.WS_PORT, () => {
        console.log(`${new Date()} WebSocket Server is listening on port ${process.env.WS_PORT}.`);
    });
    WebSocketServer.prototype.wsServer = new WsServer({
        httpServer: WebSocketServer.prototype.httpServer,
        autoAcceptConnections: false
    });
    WebSocketServer.prototype.wsServer.on('request', WebSocketServer.prototype.requestHandler);
};

WebSocketServer.prototype.originIsAllowed = origin => {
    // For now, allow all origins
    return true;
};

WebSocketServer.prototype.requestHandler = (request) => {
    if(!WebSocketServer.prototype.originIsAllowed(request.origin)) {
        request.reject();
        console.log(`${new Date()} Connection from origin ${request.origin} rejected.`);
        return;
    };

    let connection = request.accept();
    console.log(`${new Date()} Connection accepted.`);
    connection.on('message', function(message) {
        if (message.type == 'utf8') {
            console.log(`Received Message ${message.utf8Data}`);

        }
    });
    connection.on('close', (reasonCode, description) => {
        console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`)
    });
};

let WS = new WebSocketServer();
WS.startServer();
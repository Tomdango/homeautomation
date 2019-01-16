require('dotenv').config()
const WebSocketClient = require('websocket').client;
const websocketUrl = process.env.WS_SERVER;
const client = new WebSocketClient();
const Logger = require('./mockLogger');

// Connection Error
client.on('connectFailed', function(error) {
    Logger.log('crit', 'Unable to establish connection with WebSocket Server.', {url: websocketUrl});
});

// On Connection
client.on('connect', function(connect) {
    Logger.log('info', 'Successfully Connected to WebSocket Server', {url: websocketUrl});
});

client.connect(websocketUrl);
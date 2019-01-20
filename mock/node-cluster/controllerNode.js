const fs = require('fs');
const md5 = require('md5');
const randtoken = require('rand-token');
const colors = require('colors');

class ControllerNode {
    constructor(nodeName) {
        let WsClient = require("websocket").client;
        this.client = new WsClient();
        this.readLine = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.config = {
            name: nodeName,
            hash: `controller_${require("md5")(nodeName)}`
        };
        this.setupNode();
    };
    setupNode() {
        this.loadConfig((config) => {

        });
    };
    loadConfig(callback) {
        if (!fs.existsSync("./node_config")) {
            fs.mkdirSync("./node_config");
        };
        let directoryScan = fs.readdirSync("./node_config");
        if (directoryScan.includes(`${this.config.hash}.json`)) {
            console.log("Node Config Found. Restoring...");
            callback(require(`./node_config/${this.config.hash}.json`));
        } else {
            console.log(`${"No existing Node configuration found.".red} Initialising Node...`);
            this.initializeNode((config) => {
                callback(config);
            });
        }
    }
    initializeNode(callback) {
        var token = randtoken.generate(32);
        console.log("A token has been generated for this node.".yellow);
        console.log("Before you can use this node, it must be authorised in the HomeAutomation Control Panel.".underline.yellow);        
    }
}


// }
// // Connection Error
// client.on('connectFailed', function(error) {
//     Logger.log('crit', 'Unable to establish connection with WebSocket Server.', {url: websocketUrl});
// });

// // On Connection
// client.on('connect', function(connect) {
//     Logger.log('info', 'Successfully Connected to WebSocket Server', {url: websocketUrl});
// });

// client.connect(websocketUrl);

var newFile = new ControllerNode('testNode');
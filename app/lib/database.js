const MongoClient = require('mongodb').MongoClient;

class Database {
    // Database Parent Class
    constructor() {
        this.db_host = process.env.MONGO_HOST || 'localhost';
        this.db_port = process.env.MONGO_PORT || 27017;
        this.db_name = process.env.MONGO_DATABASE || 'home_automation';
    }

    // A "safe" way of handling errors
    safeThrowError(error) {
        /* TODO: Write this function */
    };

    // Connect to HomeAutomation MongoDB Database. Utility function.
    connect(callback) {
        MongoClient.connect(`mongodb://${this.db_host}:${this.db_port}/${this.db_name}`, {
            useNewUrlParser: true
        }, function(err, client) {
            if (err) throw err;
            callback(client.db());
        });
    };
};

class NodeCollection extends Database {
    // AuthCollection Constructor. Checks for node_auth collection then
    // creates it if required.
    constructor() {
        super();
        this.authCollectionName = "node_auth";
        this.checkCollection();
    };
    checkCollection(callback) {
        this.connect((database) => {
            database.collections((err, collections) => {
                if (err) throw err;
                var collectionList = [];
                for (let collection of collections) {
                    collectionList.push(collection.s.name);
                };
                if (!collectionList.includes(this.authCollectionName)) {
                    database.createCollection(this.authCollectionName, (err, collection) => {
                        if(err) throw err;
                        collection.createIndex("token", { unique: true });
                        callback("AuthCollection not found, initialized new collection.");
                    });
                };
            });
        });
    };

    // Add a new auth request from a node to the database.
    newAuthRequest(token, callback) {
        if (!this._checkToken(token)) {
            callback({status: false, message: "Token failed validation"});
            return;
        }
        this.connect((database) => {
            database.collection(this.authCollectionName, (err, collection) => {
                if (err) throw err;
                this._insertAuthRequest(collection, {
                    authorized: false,
                    status: "pending",
                    requestDate: new Date(),
                    token: token
                }, (status) => {
                    callback(status);
                })
            });
        });
    };
    
    authorizeAuthRequest(token, callback) {
        if (!this._checkToken(token)) {
            callback({status: false, message: "Token failed validation"});
            return;
        }
        this.connect((database) => {
            database.collection(this.authCollectionName, (err, collection) => {
                if (err) throw err;
                collection.findOneAndUpdate({token: token}, {
                    $set: {
                        "authorized": true, 
                        "status": "authorized",
                        "decisionDate": new Date()
                    }
                }, (err, result) => {
                    if (err) throw err;
                    if (result.lastErrorObject.n == 0) {
                        callback({status: false, message: "Token not found"});
                    } else {
                        callback({status: true, message: "Successfully authorized token"});
                    };
                });
            });
        });
    };

    denyAuthRequest(token, callback) {
        if (!this._checkToken(token)) {
            callback({status: false, message: "Token failed validation"});
            return;
        }
        this.connect((database) => {
            database.collection(this.authCollectionName, (err, collection) => {
                if (err) throw err;
                collection.findOneAndUpdate({token: token}, {
                    $set: {
                        "authorized": false, 
                        "status": "denied",
                        "decisionDate": new Date()
                    }
                }, (err, result) => {
                    if (err) throw err;
                    if (result.lastErrorObject.n == 0) {
                        callback({status: false, message: "Token not found"});
                    } else {
                        callback({status: true, message: "Successfully denied token"});
                    };
                });
            });
        });
    };

    _insertAuthRequest(collection, document, callback) {
        collection.createIndex("token", { unique: true });
        collection.insertOne(document, (err, result) => {
            if (err) {
                if(err.code == 11000) {
                    callback({status: false, message: "Duplicate Token"});
                } else {
                    callback({status: false, message: err.toString()})
                }
            } else {
                callback({status: true, message: "Successfully Inserted"});
            };
        });
    };

    _checkToken(token) {
        if(RegExp(/^[a-z0-9]+$/i).test(token) && token.length >= 32) {
            return true;
        } else {
            return false;
        };
    };
};

module.exports = {
    Database: Database,
    NodeCollection: NodeCollection
}
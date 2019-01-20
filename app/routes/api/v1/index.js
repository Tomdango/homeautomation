let router = require('express').Router();
let websocketRouter = require('./websocket');
let nodeAuthRouter = require('./node-auth');
let package = require('../../../package.json');

router.get('/status', function(req, res) {
    res.send({
        status: 'online',
        version: package.version
    })
});

router.use('/node-auth', nodeAuthRouter);
module.exports = router;
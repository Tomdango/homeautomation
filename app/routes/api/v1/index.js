let router = require('express').Router();
let control = require('./control');
let websocketRouter = require('./websocket');
let package = require('../../../package.json');

router.get('/status', function(req, res) {
    res.send({
        status: 'online',
        version: package.version
    })
});

router.use('/websocket', websocketRouter);
module.exports = router;
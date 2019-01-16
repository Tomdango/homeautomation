let router = require('express').Router();
let control = require('./control');

let package = require('../../../package.json');

router.get('/status', function(req, res) {
    res.send({
        status: 'online',
        version: package.version
    })
});

module.exports = router;
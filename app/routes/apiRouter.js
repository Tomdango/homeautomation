let router = require('express').Router();
let apiRouterV1 = require('./api/v1/index')

router.use('/v1', apiRouterV1);

module.exports = router;

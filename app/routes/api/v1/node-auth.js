const router = require("express").Router();
const NodeController =  new (require("../../../lib/database").NodeCollection);
const Logger = new (require('../../../lib/logger'))("nodeauth-api")

router.post('/auth-request', (req, res) => {
    if (!req.body.token) {
        res.status(400);
        res.send({status: 400, message: "No token supplied as part of POST body."});
        Logger.log("NODEAUTH001");
    } else {
        NodeController.newAuthRequest(req.body.token, (result) => {
            if (result.status == false) {
                res.status(400);
                res.send(result);
            } else {
                res.send(result); 
            }
        })
    }
});

router.post('/auth-status', (req, res) => {
    if (!req.body.token) {
        res.status(400);
        res.send({status: 400, message: "No token supplied as part of POST body."});
        Logger.log("NODEAUTH001");
    } else {
        NodeController.getTokenDetails(req.body.token, (result) => {
            res.send(result);
        })
    }
});

router.get('/all-tokens', (req, res) => {
    NodeController.getAllTokens((result) => {
        res.send(result);
    });
});
module.exports = router;
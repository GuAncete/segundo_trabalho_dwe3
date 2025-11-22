var express = require('express');
var router = express.Router();

const ctlCliente = require('../controllers/ctlCliente');

function authenticationMiddleware(req, res, next) {
    if (req.session.isLogged) {
        next();
    } else {
        res.redirect("/login");
    }
};

router.get('/manut', authenticationMiddleware, ctlCliente.getManutCliente);
router.get('/insert', authenticationMiddleware, ctlCliente.getInsertCliente);
router.post('/insert', authenticationMiddleware, ctlCliente.postInsertCliente);
router.get('/update/:id', authenticationMiddleware, ctlCliente.getUpdateCliente);
router.post('/update', authenticationMiddleware, ctlCliente.postUpdateCliente);
router.post('/delete', authenticationMiddleware, ctlCliente.postDeleteCliente);

module.exports = router;
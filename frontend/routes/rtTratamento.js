var express = require('express');
var router = express.Router();

const ctlTratamento = require('../controllers/ctlTratamento');

function authenticationMiddleware(req, res, next) {
    if (req.session.isLogged) {
        next();
    } else {
        res.redirect("/login");
    }
};

router.get('/manut', authenticationMiddleware, ctlTratamento.getManutTratamento);
router.get('/insert', authenticationMiddleware, ctlTratamento.getInsertTratamento);
router.post('/insert', authenticationMiddleware, ctlTratamento.postInsertTratamento);
router.get('/update/:id', authenticationMiddleware, ctlTratamento.getUpdateTratamento);
router.post('/update', authenticationMiddleware, ctlTratamento.postUpdateTratamento);
router.post('/delete', authenticationMiddleware, ctlTratamento.postDeleteTratamento);

module.exports = router;
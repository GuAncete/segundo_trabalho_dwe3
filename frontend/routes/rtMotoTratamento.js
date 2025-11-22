var express = require('express');
var router = express.Router();
const ctlMotoTratamento = require('../controllers/ctlMotoTratamento');

function authenticationMiddleware(req, res, next) {
    if (req.session.isLogged) {
        next();
    } else {
        res.redirect("/login");
    }
};

router.get('/manut', authenticationMiddleware, ctlMotoTratamento.getManutMotoTratamento);
router.get('/insert', authenticationMiddleware, ctlMotoTratamento.getInsertMotoTratamento);
router.post('/insert', authenticationMiddleware, ctlMotoTratamento.postInsertMotoTratamento);
router.get('/update/:id', authenticationMiddleware, ctlMotoTratamento.getUpdateMotoTratamento);
router.post('/update', authenticationMiddleware, ctlMotoTratamento.postUpdateMotoTratamento);
router.post('/delete', authenticationMiddleware, ctlMotoTratamento.postDeleteMotoTratamento);

module.exports = router;

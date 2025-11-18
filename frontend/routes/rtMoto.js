var express = require('express');
var router = express.Router();

const ctlMoto = require('../controllers/ctlMoto'); 

function authenticationMiddleware(req, res, next) {
    if (req.session.isLogged) {
        next();
    } else {
        res.redirect("/login");
    }
};

router.get('/manut', authenticationMiddleware, ctlMoto.getManutMoto);
router.get('/insert', authenticationMiddleware, ctlMoto.getInsertMoto);
router.post('/insert', authenticationMiddleware, ctlMoto.postInsertMoto);
router.get('/update/:id', authenticationMiddleware, ctlMoto.getUpdateMoto);
router.post('/update', authenticationMiddleware, ctlMoto.postUpdateMoto);
router.post('/delete', authenticationMiddleware, ctlMoto.postDeleteMoto);

module.exports = router;
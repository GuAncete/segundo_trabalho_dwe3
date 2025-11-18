var express = require('express');
var router = express.Router();

const ctlLogin = require('../controllers/ctlLogin');
const ctlUsuario = require('../controllers/ctlUsuario');

function authenticationMiddleware(req, res, next) {
    if (req.session.isLogged) {
        next();
    } else {
        res.redirect("/login");
    }
};

router.get('/login', ctlLogin.getLogin);
router.post('/login', ctlLogin.postLogin);

router.get('/logout', ctlLogin.getLogout);

router.get('/register', ctlUsuario.getRegister);
router.post('/register', ctlUsuario.postRegister);

router.get('/', authenticationMiddleware, function(req, res, next) {
  res.render('index', { 
    title: 'Página Inicial', 
    userName: req.session.userName 
  });
});

module.exports = router;
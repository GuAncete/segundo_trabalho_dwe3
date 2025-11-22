const axios = require("axios");
require('dotenv').config();
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

router.get('/', authenticationMiddleware, async function(req, res, next) {
  try {
    const config = {
        headers: { 'Authorization': `Bearer ${req.session.token}` }
    };

    const [respClientes, respMotos, respTratamentos, respOS] = await Promise.all([
        axios.get(process.env.SERVIDOR_DW3 + "/GetAllCliente", config),
        axios.get(process.env.SERVIDOR_DW3 + "/GetAllMoto", config),
        axios.get(process.env.SERVIDOR_DW3 + "/GetAllTratamento", config),
        axios.get(process.env.SERVIDOR_DW3 + "/GetAllMotoTratamento", config)
    ]);

    res.render('index', { 
      title: 'Dashboard - Oficina', 
      userName: req.session.userName,
      qtdClientes: respClientes.data.length,
      qtdMotos: respMotos.data.length,
      qtdTratamentos: respTratamentos.data.length,
      qtdOS: respOS.data.length
    });

  } catch (error) {
    console.error("Erro ao carregar dashboard:", error);
    res.render('index', { 
      title: 'Dashboard - Oficina (Erro)', 
      userName: req.session.userName,
      qtdClientes: 0, qtdMotos: 0, qtdTratamentos: 0, qtdOS: 0
    });
  }
});

module.exports = router;
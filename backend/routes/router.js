const express = require("express");
const routerApp = express.Router();

const ctlUsuario = require("../controllers/ctlUsuario");
const ctlCliente = require("../controllers/ctlCliente");
const ctlMoto = require("../controllers/ctlMoto");
const ctlTratamento = require("../controllers/ctlTratamento");
const ctlMotoTratamento = require("../controllers/ctlMotoTratamento");


const appLogin = require("../controllers/ctlLogin"); // Autenticação JWT

// middleware padrão
routerApp.use((req, res, next) => {
  next();
});

// rota base
routerApp.get("/", (req, res) => {
  res.send("API Oficina — online!");
});

// =================== USUÁRIO =====================
// Rota pública para cadastro (sem autenticação)
routerApp.post("/InsertUsuario", ctlUsuario.insertUsuario);
// Rotas protegidas
routerApp.get("/GetAllUsuario", appLogin.AutenticaJWT, ctlUsuario.getAllUsuario);
routerApp.post("/GetUsuarioByID", appLogin.AutenticaJWT, ctlUsuario.getUsuarioById);

routerApp.post("/UpdateUsuario", appLogin.AutenticaJWT, ctlUsuario.updateUsuario);
routerApp.post("/DeleteUsuario", appLogin.AutenticaJWT, ctlUsuario.deleteUsuario);


// =================== CLIENTE =====================
routerApp.get("/GetAllCliente", appLogin.AutenticaJWT, ctlCliente.getAllCliente);
routerApp.post("/GetClienteByID", appLogin.AutenticaJWT, ctlCliente.getClienteById);
routerApp.post("/InsertCliente", appLogin.AutenticaJWT, ctlCliente.insertCliente);
routerApp.post("/UpdateCliente", appLogin.AutenticaJWT, ctlCliente.updateCliente);
routerApp.post("/DeleteCliente", appLogin.AutenticaJWT, ctlCliente.deleteCliente);


// =================== MOTO =====================
routerApp.get("/GetAllMoto", appLogin.AutenticaJWT, ctlMoto.getAllMoto);
routerApp.post("/GetMotoByID", appLogin.AutenticaJWT, ctlMoto.getMotoById);
routerApp.post("/InsertMoto", appLogin.AutenticaJWT, ctlMoto.insertMoto);
routerApp.post("/UpdateMoto", appLogin.AutenticaJWT, ctlMoto.updateMoto);
routerApp.post("/DeleteMoto", appLogin.AutenticaJWT, ctlMoto.deleteMoto);


// =================== TRATAMENTO =====================
routerApp.get("/GetAllTratamento", appLogin.AutenticaJWT, ctlTratamento.getAllTratamento);
routerApp.post("/GetTratamentoByID", appLogin.AutenticaJWT, ctlTratamento.getTratamentoById);
routerApp.post("/InsertTratamento", appLogin.AutenticaJWT, ctlTratamento.insertTratamento);
routerApp.post("/UpdateTratamento", appLogin.AutenticaJWT, ctlTratamento.updateTratamento);
routerApp.post("/DeleteTratamento", appLogin.AutenticaJWT, ctlTratamento.deleteTratamento);


// =================== MOTO x TRATAMENTO =====================
routerApp.get("/GetAllMotoTratamento", appLogin.AutenticaJWT, ctlMotoTratamento.getAllMotoTratamento);
routerApp.post("/GetMotoTratamentoByID", appLogin.AutenticaJWT, ctlMotoTratamento.getMotoTratamentoById);
routerApp.post("/InsertMotoTratamento", appLogin.AutenticaJWT, ctlMotoTratamento.insertMotoTratamento);
routerApp.post("/UpdateMotoTratamento", appLogin.AutenticaJWT, ctlMotoTratamento.updateMotoTratamento);
routerApp.post("/DeleteMotoTratamento", appLogin.AutenticaJWT, ctlMotoTratamento.deleteMotoTratamento);


// ROTAS DE LOGIN
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;
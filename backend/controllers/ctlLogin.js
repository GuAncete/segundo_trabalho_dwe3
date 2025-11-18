const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const mdlLogin = require("../models/mdlLogin");

const Login = async (req, res) => {
  const email_usuario = req.body.email_usuario; 
  const senha_usuario = req.body.senha_usuario; 

  const credencial = await mdlLogin.GetCredencial(email_usuario);

  if (!credencial) {
    return res.status(403).json({ message: "Usuário não encontrado!" });
  }

  const senhaCorreta = await bCrypt.compare( 
    senha_usuario,
    credencial.senha_usuario
  );

  if (!senhaCorreta) {
    return res.status(403).json({ message: "Senha inválida!" });
  }

  const token = jwt.sign(
    {
      id: credencial.id_usuario,
      email: credencial.email_usuario,
      nome_usuario: credencial.nome_usuario
    },
    process.env.SECRET_API,
    { expiresIn: "2h" }
  );

  return res.json({
    auth: true,
    token: token,
    nome_usuario: credencial.nome_usuario
  });
};

function AutenticaJWT(req, res, next) {
  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    return res.status(401).json({
      auth: false,
      message: "Token JWT não informado",
    });
  }

  const token = tokenHeader.replace("Bearer ", "");

  jwt.verify(token, process.env.SECRET_API, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        auth: false,
        message: "Token inválido!",
      });
    }

    req.id_usuario = decoded.id;
    req.nome_usuario = decoded.nome_usuario;

    next();
  });
}

const Logout = (req, res) => {
  res.json({ auth: false, token: null });
};

module.exports = {
  Login,
  Logout,
  AutenticaJWT,
};

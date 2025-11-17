const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const mdlLogin = require("../models/mdlLogin");

const Login = async (req, res) => {
  const email_usuario = req.body.UserName;
  const senha_usuario = req.body.Password;

  const credencial = await mdlLogin.GetCredencial(email_usuario);

  if (!credencial) {
    return res.status(403).json({ message: "Usuário não encontrado!" });
  }

  const senhaCorreta = bCrypt.compareSync(
    senha_usuario,
    credencial.senha_usuario
  );

  if (!senhaCorreta) {
    return res.status(403).json({ message: "Senha inválida!" });
  }

  // token guarda o ID e o email
  const token = jwt.sign(
    {
      id: credencial.id_usuario,
      email: credencial.email_usuario,
    },
    process.env.SECRET_API,
    { expiresIn: "2h" }
  );

  return res.json({ auth: true, token });
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

  jwt.verify(token, process.env.SECRET_API, (err) => {
    if (err) {
      return res.status(403).json({
        auth: false,
        message: "Token inválido!",
      });
    }
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

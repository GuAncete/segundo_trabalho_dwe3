const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const mdlLogin = require("../models/mdlLogin");

const Login = async (req, res) => {
  const email = req.body.UserName;
  const senha = req.body.Password;

  const credencial = await mdlLogin.GetCredencial(email);

  if (!credencial) {
    return res.status(403).json({ message: "Usuário não identificado!" });
  }

  const senhaCorreta = bCrypt.compareSync(senha, credencial.senha_hash);

  if (!senhaCorreta) {
    return res.status(403).json({ message: "Login inválido!" });
  }

  // token guarda o ID OU email
  const token = jwt.sign(
    { email: credencial.email }, 
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

  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_API, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        auth: false,
        message: "JWT inválido ou expirado",
      });
    }

    req.email = decoded.email;
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

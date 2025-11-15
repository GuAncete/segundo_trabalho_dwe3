const db = require("../database/databaseconfig");

const GetCredencial = async (loginPar) => {
  return (
    await db.query(
      "select emailUsuario, senhaUsuario " +
        "from usuario where emailUsuario = $1 and deleted = false",
      [loginPar]
    )
  ).rows;
};

module.exports = {
  GetCredencial,
};

const db = require("../database/databaseconfig");

const GetCredencial = async (email) => {
  const query = `
    SELECT id_usuario, email_usuario, senha_usuario, nome_usuario
    FROM usuario
    WHERE email_usuario = $1
      AND deleted = false
  `;

  const { rows } = await db.query(query, [email]);
  return rows[0];
};

module.exports = {
  GetCredencial,
};

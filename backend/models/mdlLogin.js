const db = require("../database/databaseconfig");

const GetCredencial = async (email) => {
  const query = `
    SELECT email, senha_hash 
    FROM usuario 
    WHERE email = $1 AND deleted = false
  `;

  const { rows } = await db.query(query, [email]);
  return rows[0]; 
};

module.exports = {
  GetCredencial,
};

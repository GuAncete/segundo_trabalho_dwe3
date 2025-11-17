const db = require("../database/databaseconfig");
const bcrypt = require("bcryptjs");

// Buscar todos os usuários
const getAllUsuario = async () => {
  const { rows } = await db.query(`
    SELECT * FROM usuario 
    ORDER BY id_usuario;
  `);
  return rows;
};

// Buscar usuário por ID
const getUsuarioById = async (id_usuario) => {
  const { rows } = await db.query(
    `
    SELECT * FROM usuario 
    WHERE id_usuario = $1;
    `,
    [id_usuario]
  );

  return rows[0];
};

// Criar usuário
const insertUsuario = async (usuario) => {
  const { nome_usuario, email_usuario, senha_usuario, tipo_usuario } = usuario;

  // criar hash
  const senhaHash = await bcrypt.hash(senha_usuario, 10);

  const query = `
    INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario, tipo_usuario)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [nome_usuario, email_usuario, senhaHash, tipo_usuario];

  const { rows } = await db.query(query, values);
  return rows[0];
};

// Atualizar usuário
const updateUsuario = async (id_usuario, usuario) => {
  const { nome_usuario, email_usuario, senha_usuario, tipo_usuario } = usuario;

  let senhaHash = null;

  if (senha_usuario) {
    senhaHash = await bcrypt.hash(senha_usuario, 10);
  }

  const query = `
    UPDATE usuario
    SET 
      nome_usuario = $1,
      email_usuario = $2,
      senha_usuario = COALESCE($3, senha_usuario),
      tipo_usuario = $4
    WHERE id_usuario = $5
    RETURNING *;
  `;

  const values = [nome_usuario, email_usuario, senhaHash, tipo_usuario, id_usuario];

  const { rows } = await db.query(query, values);
  return rows[0];
};

// Deletar usuário
const deleteUsuario = async (id_usuario) => {
  const { rows } = await db.query(
    `
    DELETE FROM usuario
    WHERE id_usuario = $1
    RETURNING *;
    `,
    [id_usuario]
  );

  return rows[0];
};

module.exports = {
  getAllUsuario,
  getUsuarioById,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
};

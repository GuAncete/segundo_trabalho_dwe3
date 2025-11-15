const db = require("../database/databaseconfig");
const bcrypt = require("bcryptjs");

// Buscar todos os usuários (não deletados)
const getAllUsuario = async () => {
  const { rows } = await db.query(`
    SELECT * FROM usuario 
    WHERE deleted = false 
    ORDER BY id_usuario;
  `);
  return rows;
};

// Buscar usuário por ID
const getUsuarioById = async (id_usuario) => {
  const { rows } = await db.query(`
    SELECT * FROM usuario 
    WHERE id_usuario = $1 AND deleted = false;
  `, [id_usuario]);

  return rows[0];
};

// Criar usuário
const insertUsuario = async (usuario) => {
  const { nome, email, senha, tipo_pessoa } = usuario;

  // Cria o hash da senha
  const senhaHash = await bcrypt.hash(senha, 10);

  const query = `
    INSERT INTO usuario (nome, email, senha_hash, tipo_pessoa)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [nome, email, senhaHash, tipo_pessoa];

  const { rows } = await db.query(query, values);
  return rows[0];
};

// Atualizar usuário
const updateUsuario = async (id_usuario, usuario) => {
  const { nome, email, senha, tipo_pessoa } = usuario;

  let senhaHash = null;

  if (senha) {
    senhaHash = await bcrypt.hash(senha, 10);
  }

  const query = `
    UPDATE usuario
    SET 
      nome = $1, 
      email = $2, 
      senha_hash = COALESCE($3, senha_hash), 
      tipo_pessoa = $4
    WHERE id_usuario = $5 AND deleted = false
    RETURNING *;
  `;

  const values = [nome, email, senhaHash, tipo_pessoa, id_usuario];

  const { rows } = await db.query(query, values);
  return rows[0];
};

// Deletar usuário (soft delete)
const deleteUsuario = async (id_usuario) => {
  const { rows } = await db.query(`
    UPDATE usuario 
    SET deleted = true 
    WHERE id_usuario = $1 AND deleted = false
    RETURNING *;
  `, [id_usuario]);

  return rows[0];
};

// Verificar se email já existe
const verificarEmailExistente = async (email) => {
  const { rows } = await db.query(`
    SELECT * FROM usuario 
    WHERE email = $1 AND deleted = false;
  `, [email]);

  return rows.length > 0 ? rows[0] : null;
};

module.exports = {
  getAllUsuario,
  getUsuarioById,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
  verificarEmailExistente,
};

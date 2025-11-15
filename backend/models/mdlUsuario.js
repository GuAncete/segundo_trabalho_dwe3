const db = require ("../database/databaseconfig");
const bcrypt = require('bcryptjs');

// Buscar todos os Usuario (não deletados)
const getAllUsuario = async () => {
  const { rows } = await db.query("SELECT * FROM usuario WHERE deleted = false ORDER BY id_usuario;");
  return rows;
};

// Buscar usuario por ID (não deletados)
const getUsuarioById = async (id_usuario) => {
  const { rows } = await db.query("SELECT * FROM usuario WHERE id_usuario = $1 AND deleted = false;", [id_usuario]);
  return rows[0];
};

// Criar usuario 
const insertUsuario = async (usuario) => {
  const { nome, email, senha, tipo, cpf_cnpj } = usuario;
  
  // Hash da senha
  const saltRounds = 10;
  const senhaHash = await bcrypt.hash(senha, saltRounds);
  
  const query = `
    INSERT INTO usuario (nome, email, senha, tipo, cpf_cnpj)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [nome, email, senhaHash, tipo, cpf_cnpj];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// Atualizar usuario
const updateUsuario = async (id_usuario, usuario) => {
  const { nome, email, senha, tipo, cpf_cnpj } = usuario;
  
  let senhaHash = senha;
  if (senha) {
    const saltRounds = 10;
    senhaHash = await bcrypt.hash(senha, saltRounds);
  }
  
  const query = `
    UPDATE usuario
    SET nome = $1, email = $2, senha = $3, tipo = $4, cpf_cnpj = $5
    WHERE id_usuario = $6 AND deleted = false
    RETURNING *;
  `;
  const values = [nome, email, senhaHash, tipo, cpf_cnpj, id_usuario];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// Deletar usuario (soft delete)
const deleteUsuario = async (id_usuario) => {
  const { rows } = await db.query("UPDATE usuario SET deleted = true WHERE id_usuario = $1 AND deleted = false RETURNING *;", [id_usuario]);
  return rows[0];
};

// Verificar se CPF/CNPJ já existe
const verificarCpfCnpjExistente = async (cpf_cnpj) => {
  const { rows } = await db.query(
    "SELECT * FROM usuario WHERE cpf_cnpj = $1 AND deleted = false;", 
    [cpf_cnpj]
  );
  return rows.length > 0 ? rows[0] : null;
};


module.exports = {
  getAllUsuario,
  getUsuarioById,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
  verificarCpfCnpjExistente,
};
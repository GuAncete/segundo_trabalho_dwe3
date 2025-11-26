const db = require("../database/databaseconfig");

// Buscar todos os clientes (não deletados)
const getAllCliente = async () => {
  const { rows } = await db.query(`
    SELECT * FROM cliente 
    WHERE deleted = false 
    ORDER BY id_cliente;
  `);
  return rows;
};

// Buscar cliente por ID
const getClienteById = async (id_cliente) => {
  const { rows } = await db.query(`
    SELECT * FROM cliente 
    WHERE id_cliente = $1 AND deleted = false;
  `, [id_cliente]);

  return rows[0];
};

// Criar cliente
const insertCliente = async (cliente) => {
  const { nome_cliente, cpf_cliente, telefone_cliente, email_cliente } = cliente;

  const query = `
    INSERT INTO cliente (nome_cliente, cpf_cliente, telefone_cliente, email_cliente)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [nome_cliente, cpf_cliente, telefone_cliente, email_cliente];
  const { rows } = await db.query(query, values);

  return rows[0];
};

// Atualizar cliente
const updateCliente = async (id_cliente, cliente) => {
  const { nome_cliente, cpf_cliente, telefone_cliente, email_cliente } = cliente;

  const query = `
    UPDATE cliente
    SET
      nome_cliente = $1,
      cpf_cliente = $2,
      telefone_cliente = $3,
      email_cliente = $4
    WHERE id_cliente = $5 AND deleted = false
    RETURNING *;
  `;

  const values = [
    nome_cliente,
    cpf_cliente,
    telefone_cliente,
    email_cliente,
    id_cliente
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};

// Soft delete
const deleteCliente = async (id_cliente) => {
  const { rows } = await db.query(`
    UPDATE cliente
    SET deleted = true
    WHERE id_cliente = $1 AND deleted = false
    RETURNING *;
  `, [id_cliente]);

  return rows[0];
};

module.exports = {
  getAllCliente,
  getClienteById,
  insertCliente,
  updateCliente,
  deleteCliente,
};

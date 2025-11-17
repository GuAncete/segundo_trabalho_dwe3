const db = require("../database/databaseconfig");

// Buscar todos os clientes (não deletados)
const getAllCliente = async () => {
  const { rows } = await db.query(`
    SELECT * FROM cliente 
    WHERE deleted = false 
    ORDER BY idCliente;
  `);
  return rows;
};

// Buscar cliente por ID
const getClienteById = async (idCliente) => {
  const { rows } = await db.query(`
    SELECT * FROM cliente 
    WHERE idCliente = $1 AND deleted = false;
  `, [idCliente]);

  return rows[0];
};

// Criar cliente
const insertCliente = async (cliente) => {
  const { nomeCliente, cpfCliente, telefoneCliente, emailCliente } = cliente;

  const query = `
    INSERT INTO cliente (nomeCliente, cpfCliente, telefoneCliente, emailCliente)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [nomeCliente, cpfCliente, telefoneCliente, emailCliente];
  const { rows } = await db.query(query, values);

  return rows[0];
};

// Atualizar cliente
const updateCliente = async (idCliente, cliente) => {
  const { nomeCliente, cpfCliente, telefoneCliente, emailCliente } = cliente;

  const query = `
    UPDATE cliente
    SET
      nomeCliente = $1,
      cpfCliente = $2,
      telefoneCliente = $3,
      emailCliente = $4
    WHERE idCliente = $5 AND deleted = false
    RETURNING *;
  `;

  const values = [
    nomeCliente,
    cpfCliente,
    telefoneCliente,
    emailCliente,
    idCliente
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};

// Soft delete
const deleteCliente = async (idCliente) => {
  const { rows } = await db.query(`
    UPDATE cliente
    SET deleted = true
    WHERE idCliente = $1 AND deleted = false
    RETURNING *;
  `, [idCliente]);

  return rows[0];
};

// Verificar CPF existente
const verificarCpfExistente = async (cpfCliente) => {
  const { rows } = await db.query(`
    SELECT * FROM cliente
    WHERE cpfCliente = $1 AND deleted = false;
  `, [cpfCliente]);

  return rows.length > 0 ? rows[0] : null;
};

module.exports = {
  getAllCliente,
  getClienteById,
  insertCliente,
  updateCliente,
  deleteCliente,
  verificarCpfExistente,
};

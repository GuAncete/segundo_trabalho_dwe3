const db = require ("../database/databaseconfig");

// Buscar todos os clientes (não deletados)
const getAllCliente = async () => {
  const { rows } = await db.query(
    "SELECT * FROM cliente WHERE deleted = false ORDER BY id_cliente;"
  );
  return rows;
};

// Buscar cliente por ID (não deletados)
const getClienteById = async (id_cliente) => {
  const { rows } = await db.query(
    "SELECT * FROM cliente WHERE id_cliente = $1 AND deleted = false;",
    [id_cliente]
  );
  return rows[0];
};

// Criar cliente
const insertCliente = async (cliente) => {
  const { nome_cliente, cpf, telefone, email, id_usuario } = cliente;

  const query = `
    INSERT INTO cliente (nome_cliente, cpf, telefone, email, id_usuario)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [nome_cliente, cpf, telefone, email, id_usuario];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// Atualizar cliente
const updateCliente = async (id_cliente, cliente) => {
  const { nome_cliente, cpf, telefone, email, id_usuario } = cliente;

  const query = `
    UPDATE cliente
    SET nome_cliente = $1,
        cpf = $2,
        telefone = $3,
        email = $4,
        id_usuario = $5
    WHERE id_cliente = $6 AND deleted = false
    RETURNING *;
  `;

  const values = [
    nome_cliente,
    cpf,
    telefone,
    email,
    id_usuario,
    id_cliente
  ];

  const { rows } = await db.query(query, values);
  return rows[0];
};

// Deletar cliente (soft delete)
const deleteCliente = async (id_cliente) => {
  const { rows } = await db.query(
    "UPDATE cliente SET deleted = true WHERE id_cliente = $1 AND deleted = false RETURNING *;",
    [id_cliente]
  );
  return rows[0];
};

// Verificar se CPF já existe 
const verificarCpfExistente = async (cpf) => {
  const { rows } = await db.query(
    "SELECT * FROM cliente WHERE cpf = $1 AND deleted = false;",
    [cpf]
  );
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



const db = require("../database/databaseconfig");

// Buscar todos os tratamentos (não deletados)
const getAllTratamento = async () => {
  const { rows } = await db.query(`
    SELECT * FROM tratamento 
    WHERE deleted = false 
    ORDER BY id_tratamento;
  `);
  return rows;
};

// Buscar tratamento por ID
const getTratamentoById = async (id_tratamento) => {
  const { rows } = await db.query(`
    SELECT * FROM tratamento 
    WHERE id_tratamento = $1 AND deleted = false;
  `, [id_tratamento]);

  return rows[0];
};

// Criar tratamento
const insertTratamento = async (tratamento) => {
  const { nome_tratamento, valor_tratamento, descricao_tratamento } = tratamento;

  const query = `
    INSERT INTO tratamento (nome_tratamento, valor_tratamento, descricao_tratamento)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [nome_tratamento, valor_tratamento, descricao_tratamento || null];
  const { rows } = await db.query(query, values);

  return rows[0];
};

// Atualizar tratamento
const updateTratamento = async (id_tratamento, tratamento) => {
  const { nome_tratamento, valor_tratamento, descricao_tratamento } = tratamento;

  const query = `
    UPDATE tratamento
    SET 
      nome_tratamento = $1,
      valor_tratamento = $2,
      descricao_tratamento = $3
    WHERE id_tratamento = $4 AND deleted = false
    RETURNING *;
  `;

  const values = [nome_tratamento, valor_tratamento, descricao_tratamento || null, id_tratamento];

  const { rows } = await db.query(query, values);
  return rows[0];
};

// Deletar (soft delete)
const deleteTratamento = async (id_tratamento) => {
  const { rows } = await db.query(`
    UPDATE tratamento 
    SET deleted = true 
    WHERE id_tratamento = $1 AND deleted = false
    RETURNING *;
  `, [id_tratamento]);

  return rows[0];
};

// Verificar duplicidade por nome
const verificarnome_tratamento = async (nome_tratamento) => {
  const { rows } = await db.query(`
    SELECT * FROM tratamento
    WHERE nome_tratamento = $1 AND deleted = false;
  `, [nome_tratamento]);

  return rows.length > 0 ? rows[0] : null;
};

module.exports = {
  getAllTratamento,
  getTratamentoById,
  insertTratamento,
  updateTratamento,
  deleteTratamento,
  verificarnome_tratamento,
};

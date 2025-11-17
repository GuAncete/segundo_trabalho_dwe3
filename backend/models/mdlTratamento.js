const db = require("../database/databaseconfig");

// Buscar todos os tratamentos (não deletados)
const getAllTratamento = async () => {
  const { rows } = await db.query(`
    SELECT * FROM tratamento 
    WHERE deleted = false 
    ORDER BY idTratamento;
  `);
  return rows;
};

// Buscar tratamento por ID
const getTratamentoById = async (idTratamento) => {
  const { rows } = await db.query(`
    SELECT * FROM tratamento 
    WHERE idTratamento = $1 AND deleted = false;
  `, [idTratamento]);

  return rows[0];
};

// Criar tratamento
const insertTratamento = async (tratamento) => {
  const { nomeTratamento, precoTratamento } = tratamento;

  const query = `
    INSERT INTO tratamento (nomeTratamento, precoTratamento)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const values = [nomeTratamento, precoTratamento];
  const { rows } = await db.query(query, values);

  return rows[0];
};

// Atualizar tratamento
const updateTratamento = async (idTratamento, tratamento) => {
  const { nomeTratamento, precoTratamento } = tratamento;

  const query = `
    UPDATE tratamento
    SET 
      nomeTratamento = $1,
      precoTratamento = $2
    WHERE idTratamento = $3 AND deleted = false
    RETURNING *;
  `;

  const values = [nomeTratamento, precoTratamento, idTratamento];

  const { rows } = await db.query(query, values);
  return rows[0];
};

// Deletar (soft delete)
const deleteTratamento = async (idTratamento) => {
  const { rows } = await db.query(`
    UPDATE tratamento 
    SET deleted = true 
    WHERE idTratamento = $1 AND deleted = false
    RETURNING *;
  `, [idTratamento]);

  return rows[0];
};

// Verificar duplicidade por nome
const verificarNomeTratamento = async (nomeTratamento) => {
  const { rows } = await db.query(`
    SELECT * FROM tratamento
    WHERE nomeTratamento = $1 AND deleted = false;
  `, [nomeTratamento]);

  return rows.length > 0 ? rows[0] : null;
};

module.exports = {
  getAllTratamento,
  getTratamentoById,
  insertTratamento,
  updateTratamento,
  deleteTratamento,
  verificarNomeTratamento,
};

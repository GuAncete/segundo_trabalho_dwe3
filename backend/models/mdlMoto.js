const db = require("../database/databaseconfig");

// Buscar todas as motos (não deletadas)
const getAllMoto = async () => {
  const { rows } = await db.query(`
    SELECT * FROM moto 
    WHERE deleted = false 
    ORDER BY idMoto;
  `);
  return rows;
};

// Buscar moto por ID
const getMotoById = async (idMoto) => {
  const { rows } = await db.query(`
    SELECT * FROM moto 
    WHERE idMoto = $1 AND deleted = false;
  `, [idMoto]);

  return rows[0];
};

// Criar moto
const insertMoto = async (moto) => {
  const { modeloMoto, marcaMoto, anoMoto, idCliente } = moto;

  const query = `
    INSERT INTO moto (modeloMoto, marcaMoto, anoMoto, idCliente)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [modeloMoto, marcaMoto, anoMoto, idCliente];
  const { rows } = await db.query(query, values);

  return rows[0];
};

// Atualizar moto
const updateMoto = async (idMoto, moto) => {
  const { modeloMoto, marcaMoto, anoMoto, idCliente } = moto;

  const query = `
    UPDATE moto
    SET
      modeloMoto = $1,
      marcaMoto = $2,
      anoMoto = $3,
      idCliente = $4
    WHERE idMoto = $5 AND deleted = false
    RETURNING *;
  `;

  const values = [modeloMoto, marcaMoto, anoMoto, idCliente, idMoto];

  const { rows } = await db.query(query, values);
  return rows[0];
};

// Deletar moto (soft delete)
const deleteMoto = async (idMoto) => {
  const { rows } = await db.query(`
    UPDATE moto
    SET deleted = true
    WHERE idMoto = $1 AND deleted = false
    RETURNING *;
  `, [idMoto]);

  return rows[0];
};

// Verificar se o cliente já cadastrou esse modelo (opcional)
const verificarMotoExistente = async (modeloMoto, idCliente) => {
  const { rows } = await db.query(`
    SELECT * FROM moto
    WHERE modeloMoto = $1 AND idCliente = $2 AND deleted = false;
  `, [modeloMoto, idCliente]);

  return rows.length > 0 ? rows[0] : null;
};

module.exports = {
  getAllMoto,
  getMotoById,
  insertMoto,
  updateMoto,
  deleteMoto,
  verificarMotoExistente,
};

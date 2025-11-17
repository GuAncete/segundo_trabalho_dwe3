const db = require("../database/databaseconfig");

// Buscar todas as motos (não deletadas)
const getAllMoto = async () => {
  const { rows } = await db.query(`
    SELECT * FROM moto 
    WHERE deleted = false 
    ORDER BY id_moto;
  `);
  return rows;
};

// Buscar moto por ID
const getMotoById = async (id_moto) => {
  const { rows } = await db.query(`
    SELECT * FROM moto 
    WHERE id_moto = $1 AND deleted = false;
  `, [id_moto]);

  return rows[0];
};

// Criar moto
const insertMoto = async (moto) => {
  const { modelo_moto, marca_moto, ano_moto, id_cliente } = moto;

  const query = `
    INSERT INTO moto (modelo_moto, marca_moto, ano_moto, id_cliente)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [modelo_moto, marca_moto, ano_moto, id_cliente];
  const { rows } = await db.query(query, values);

  return rows[0];
};

// Atualizar moto
const updateMoto = async (id_moto, moto) => {
  const { modelo_moto, marca_moto, ano_moto, id_cliente } = moto;

  const query = `
    UPDATE moto
    SET
      modelo_moto = $1,
      marca_moto = $2,
      ano_moto = $3,
      id_cliente = $4
    WHERE id_moto = $5 AND deleted = false
    RETURNING *;
  `;

  const values = [modelo_moto, marca_moto, ano_moto, id_cliente, id_moto];

  const { rows } = await db.query(query, values);
  return rows[0];
};

// Deletar moto (soft delete)
const deleteMoto = async (id_moto) => {
  const { rows } = await db.query(`
    UPDATE moto
    SET deleted = true
    WHERE id_moto = $1 AND deleted = false
    RETURNING *;
  `, [id_moto]);

  return rows[0];
};

// Verificar se o cliente já cadastrou esse modelo (opcional)
const verificarMotoExistente = async (modelo_moto, id_cliente) => {
  const { rows } = await db.query(`
    SELECT * FROM moto
    WHERE modelo_moto = $1 AND id_cliente = $2 AND deleted = false;
  `, [modelo_moto, id_cliente]);

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

const db = require("../database/databaseconfig");

// Buscar todas as Motos (não deletadas)
const getAllMoto = async () => {
    const { rows } = await db.query(
        "SELECT * FROM moto WHERE deleted = false ORDER BY id_moto;"
    );
    return rows;
};

// Buscar moto por ID (não deletado)
const getMotoById = async (id_moto) => {
    const { rows } = await db.query(
        "SELECT * FROM moto WHERE id_moto = $1 AND deleted = false;",
        [id_moto]
    );
    return rows[0];
};

// Criar moto
const insertMoto = async (moto) => {
    const { modelo, marca, ano_fabricacao, id_cliente, id_usuario } = moto;

    const query = `
        INSERT INTO moto (modelo, marca, ano_fabricacao, id_cliente, id_usuario)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [modelo, marca, ano_fabricacao, id_cliente, id_usuario];
    const { rows } = await db.query(query, values);
    return rows[0];
};

// Atualizar moto
const updateMoto = async (id_moto, moto) => {
    const { modelo, marca, ano_fabricacao, id_cliente, id_usuario } = moto;

    const query = `
        UPDATE moto
        SET modelo = $1,
            marca = $2,
            ano_fabricacao = $3,
            id_cliente = $4,
            id_usuario = $5
        WHERE id_moto = $6 AND deleted = false
        RETURNING *;
    `;

    const values = [
        modelo,
        marca,
        ano_fabricacao,
        id_cliente,
        id_usuario,
        id_moto
    ];

    const { rows } = await db.query(query, values);
    return rows[0];
};

// Deletar moto (soft delete)
const deleteMoto = async (id_moto) => {
    const { rows } = await db.query(
        "UPDATE moto SET deleted = true WHERE id_moto = $1 AND deleted = false RETURNING *;",
        [id_moto]
    );
    return rows[0];
};

// Verificar se já existe moto do cliente com mesmo modelo (opcional)
const verificarMotoExistente = async (modelo, id_cliente) => {
    const { rows } = await db.query(
        "SELECT * FROM moto WHERE modelo = $1 AND id_cliente = $2 AND deleted = false;",
        [modelo, id_cliente]
    );
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

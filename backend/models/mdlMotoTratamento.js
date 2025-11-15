const db = require("../database/databaseconfig");

// Buscar todos os registros moto_tratamento (não deletados)
const getAllMotoTratamento = async () => {
    const { rows } = await db.query(
        "SELECT * FROM moto_tratamento WHERE deleted = false ORDER BY id_moto_tratamento;"
    );
    return rows;
};

// Buscar registro específico
const getMotoTratamentoById = async (id_moto_tratamento) => {
    const { rows } = await db.query(
        "SELECT * FROM moto_tratamento WHERE id_moto_tratamento = $1 AND deleted = false;",
        [id_moto_tratamento]
    );
    return rows[0];
};

// Criar relação moto ↔ tratamento
const insertMotoTratamento = async (registro) => {
    const { id_moto, id_tratamento, id_usuario, data_servico, observacoes } = registro;

    const query = `
        INSERT INTO moto_tratamento
        (id_moto, id_tratamento, id_usuario, data_servico, observacoes)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;

    const values = [id_moto, id_tratamento, id_usuario, data_servico, observacoes];
    const { rows } = await db.query(query, values);
    return rows[0];
};

// Atualizar relação
const updateMotoTratamento = async (id_moto_tratamento, registro) => {
    const { id_moto, id_tratamento, id_usuario, data_servico, observacoes } = registro;

    const query = `
        UPDATE moto_tratamento
        SET id_moto = $1,
            id_tratamento = $2,
            id_usuario = $3,
            data_servico = $4,
            observacoes = $5
        WHERE id_moto_tratamento = $6 AND deleted = false
        RETURNING *;
    `;

    const values = [
        id_moto,
        id_tratamento,
        id_usuario,
        data_servico,
        observacoes,
        id_moto_tratamento
    ];

    const { rows } = await db.query(query, values);
    return rows[0];
};

// Soft delete
const deleteMotoTratamento = async (id_moto_tratamento) => {
    const { rows } = await db.query(
        "UPDATE moto_tratamento SET deleted = true WHERE id_moto_tratamento = $1 AND deleted = false RETURNING *;",
        [id_moto_tratamento]
    );
    return rows[0];
};

module.exports = {
    getAllMotoTratamento,
    getMotoTratamentoById,
    insertMotoTratamento,
    updateMotoTratamento,
    deleteMotoTratamento,
};

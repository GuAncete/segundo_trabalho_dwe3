const db = require("../database/databaseconfig");

// Buscar todos os tratamentos (não deletados)
const getAllTratamento = async () => {
    const { rows } = await db.query(
        "SELECT * FROM tratamento WHERE deleted = false ORDER BY id_tratamento;"
    );
    return rows;
};

// Buscar tratamento por ID (não deletado)
const getTratamentoById = async (id_tratamento) => {
    const { rows } = await db.query(
        "SELECT * FROM tratamento WHERE id_tratamento = $1 AND deleted = false;",
        [id_tratamento]
    );
    return rows[0];
};

// Criar tratamento
const insertTratamento = async (tratamento) => {
    const { nome_tratamento, preco } = tratamento;

    const query = `
        INSERT INTO tratamento (nome_tratamento, preco)
        VALUES ($1, $2)
        RETURNING *;
    `;

    const values = [nome_tratamento, preco];
    const { rows } = await db.query(query, values);
    return rows[0];
};

// Atualizar tratamento
const updateTratamento = async (id_tratamento, tratamento) => {
    const { nome_tratamento, preco } = tratamento;

    const query = `
        UPDATE tratamento
        SET nome_tratamento = $1,
            preco = $2
        WHERE id_tratamento = $3 AND deleted = false
        RETURNING *;
    `;

    const values = [nome_tratamento, preco, id_tratamento];
    const { rows } = await db.query(query, values);
    return rows[0];
};

// Soft delete
const deleteTratamento = async (id_tratamento) => {
    const { rows } = await db.query(
        "UPDATE tratamento SET deleted = true WHERE id_tratamento = $1 AND deleted = false RETURNING *;",
        [id_tratamento]
    );
    return rows[0];
};

// Verificar nome duplicado
const verificarNomeTratamento = async (nome_tratamento) => {
    const { rows } = await db.query(
        "SELECT * FROM tratamento WHERE nome_tratamento = $1 AND deleted = false;",
        [nome_tratamento]
    );
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

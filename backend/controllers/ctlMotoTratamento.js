const mdlMotoTratamento = require("../models/mdlMotoTratamento");

const getAllMotoTratamento = async (req, res) => {
    try {
        const dados = await mdlMotoTratamento.getAllMotoTratamento();
        res.json(dados);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMotoTratamentoById = async (req, res) => {
    try {
        const { id_moto_tratamento } = req.body;
        const dado = await mdlMotoTratamento.getMotoTratamentoById(id_moto_tratamento);
        res.json(dado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const insertMotoTratamento = async (req, res) => {
    try {
        const dado = await mdlMotoTratamento.insertMotoTratamento(req.body);
        res.json(dado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateMotoTratamento = async (req, res) => {
    try {
        const { id_moto_tratamento } = req.body;
        const dado = await mdlMotoTratamento.updateMotoTratamento(id_moto_tratamento, req.body);
        res.json(dado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteMotoTratamento = async (req, res) => {
    try {
        const { id_moto_tratamento } = req.body;
        await mdlMotoTratamento.deleteMotoTratamento(id_moto_tratamento);
        res.json({ message: "Associação moto-tratamento deletada." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllMotoTratamento,
    getMotoTratamentoById,
    insertMotoTratamento,
    updateMotoTratamento,
    deleteMotoTratamento
};

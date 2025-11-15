const mdlMoto = require("../models/mdlMoto");

const getAllMoto = async (req, res) => {
    try {
        const dados = await mdlMoto.getAllMoto();
        res.json(dados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMotoById = async (req, res) => {
    try {
        const { id_moto } = req.body;
        const dado = await mdlMoto.getMotoById(id_moto);
        res.json(dado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const insertMoto = async (req, res) => {
    try {
        const moto = await mdlMoto.insertMoto(req.body);
        res.json(moto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMoto = async (req, res) => {
    try {
        const { id_moto } = req.body;
        const moto = await mdlMoto.updateMoto(id_moto, req.body);
        res.json(moto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMoto = async (req, res) => {
    try {
        const { id_moto } = req.body;
        await mdlMoto.deleteMoto(id_moto);
        res.json({ message: "Moto deletada." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllMoto,
    getMotoById,
    insertMoto,
    updateMoto,
    deleteMoto
};

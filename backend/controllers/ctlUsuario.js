const mdlUsuario = require("../models/mdlUsuario");


const getAllUsuario = async (req, res) => {
    try {
        const dados = await mdlUsuario.getAllUsuario();
        res.json(dados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsuarioById = async (req, res) => {
    try {
        const { id_usuario } = req.body;
        const dado = await mdlUsuario.getUsuarioById(id_usuario);
        res.json(dado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const insertUsuario = async (req, res) => {
    try {
        const usuario = await mdlUsuario.insertUsuario(req.body);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.body;
        const usuario = await mdlUsuario.updateUsuario(id_usuario, req.body);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.body;
        await mdlUsuario.deleteUsuario(id_usuario);
        res.json({ message: "Usuário deletado." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllUsuario,
    getUsuarioById,
    insertUsuario,
    updateUsuario,
    deleteUsuario
};

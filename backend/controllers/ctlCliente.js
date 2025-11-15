const mdlCliente = require("../models/mdlCliente");

const getAllCliente = async (req, res) => {
    try {
        const dados = await mdlCliente.getAllCliente();
        res.json(dados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getClienteById = async (req, res) => {
    try {
        const { id_cliente } = req.body;
        const dado = await mdlCliente.getClienteById(id_cliente);
        res.json(dado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const insertCliente = async (req, res) => {
    try {
        const cliente = await mdlCliente.insertCliente(req.body);
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCliente = async (req, res) => {
    try {
        const { id_cliente } = req.body;
        const cliente = await mdlCliente.updateCliente(id_cliente, req.body);
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteCliente = async (req, res) => {
    try {
        const { id_cliente } = req.body;
        await mdlCliente.deleteCliente(id_cliente);
        res.json({ message: "Cliente deletado." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCliente,
    getClienteById,
    insertCliente,
    updateCliente,
    deleteCliente
};

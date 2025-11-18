const axios = require("axios");
require('dotenv').config();

const getAxiosConfig = (req) => {
    return {
        headers: {
            'Authorization': `Bearer ${req.session.token}` 
        }
    };
};

exports.getManutCliente = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        const resp = await axios.get(process.env.SERVIDOR_DW3 + "/GetAllCliente", config);
        
        res.render('cliente/manut', {
            title: 'Manutenção de Clientes',
            userName: req.session.userName,
            data: resp.data 
        });
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        res.render('cliente/manut', {
            title: 'Manutenção de Clientes',
            userName: req.session.userName,
            data: [], 
            message: "Erro ao buscar dados."
        });
    }
};

exports.getInsertCliente = (req, res) => {
    res.render('cliente/form', {
        title: 'Novo Cliente',
        userName: req.session.userName,
        oper: 'insert', 
        data: {} 
    });
};

exports.postInsertCliente = async (req, res) => {
    try {
        const config = getAxiosConfig(req);

        await axios.post(process.env.SERVIDOR_DW3 + "/InsertCliente", req.body, config);
        
        res.redirect('/cliente/manut');
    } catch (error) {
        console.error("Erro ao inserir cliente:", error);
        res.render('cliente/form', {
            title: 'Novo Cliente',
            userName: req.session.userName,
            oper: 'insert',
            data: req.body, 
            message: "Erro ao salvar. Verifique os dados."
        });
    }
};

exports.getUpdateCliente = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        const id = req.params.id; 

        const resp = await axios.post(process.env.SERVIDOR_DW3 + "/GetClienteByID", { id_cliente: id }, config);
        
        res.render('cliente/form', {
            title: 'Alterar Cliente',
            userName: req.session.userName,
            oper: 'update',
            data: resp.data 
        });
    } catch (error) {
        console.error("Erro ao buscar cliente por ID:", error);
        res.redirect('/cliente/manut'); 
    }
};

exports.postUpdateCliente = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        
        await axios.post(process.env.SERVIDOR_DW3 + "/UpdateCliente", req.body, config);
        
        res.json({ status: 'ok' });
    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        res.status(500).json({ status: 'erro', message: 'Falha ao atualizar.' });
    }
};

exports.postDeleteCliente = async (req, res) => {
    try {
        const config = getAxiosConfig(req);

        await axios.post(process.env.SERVIDOR_DW3 + "/DeleteCliente", req.body, config);
        
        res.json({ status: 'ok' });
    } catch (error) {
        console.error("Erro ao deletar cliente:", error);
        res.status(500).json({ status: 'erro', message: 'Falha ao deletar.' });
    }
};
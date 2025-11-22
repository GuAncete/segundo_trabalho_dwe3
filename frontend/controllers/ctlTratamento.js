const axios = require("axios");
require('dotenv').config();

const getAxiosConfig = (req) => {
    return {
        headers: {
            'Authorization': `Bearer ${req.session.token}`
        }
    };
};

exports.getManutTratamento = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        const resp = await axios.get(process.env.SERVIDOR_DW3 + "/GetAllTratamento", config);
        
        res.render('tratamento/manut', {
            title: 'Manutenção de Tratamentos',
            userName: req.session.userName,
            data: resp.data
        });
    } catch (error) {
        console.error("Erro ao buscar tratamentos:", error);
        res.render('tratamento/manut', {
            title: 'Manutenção de Tratamentos',
            userName: req.session.userName,
            data: [],
            message: "Erro ao buscar dados."
        });
    }
};

exports.getInsertTratamento = (req, res) => {
    res.render('tratamento/form', {
        title: 'Novo Tratamento',
        userName: req.session.userName,
        oper: 'insert',
        data: {}
    });
};

exports.postInsertTratamento = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        await axios.post(process.env.SERVIDOR_DW3 + "/InsertTratamento", req.body, config);
        res.redirect('/tratamento/manut');
    } catch (error) {
        console.error("Erro ao inserir tratamento:", error);
        res.render('tratamento/form', {
            title: 'Novo Tratamento',
            userName: req.session.userName,
            oper: 'insert',
            data: req.body,
            message: "Erro ao salvar. Verifique os dados."
        });
    }
};

exports.getUpdateTratamento = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        const id = req.params.id;
        const resp = await axios.post(process.env.SERVIDOR_DW3 + "/GetTratamentoByID", { id_tratamento: id }, config);
        
        res.render('tratamento/form', {
            title: 'Alterar Tratamento',
            userName: req.session.userName,
            oper: 'update',
            data: resp.data
        });
    } catch (error) {
        console.error("Erro ao buscar tratamento por ID:", error);
        res.redirect('/tratamento/manut');
    }
};

exports.postUpdateTratamento = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        await axios.post(process.env.SERVIDOR_DW3 + "/UpdateTratamento", req.body, config);
        res.json({ status: 'ok' });
    } catch (error) {
        console.error("Erro ao atualizar tratamento:", error);
        res.status(500).json({ status: 'erro', message: 'Falha ao atualizar.' });
    }
};

exports.postDeleteTratamento = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        await axios.post(process.env.SERVIDOR_DW3 + "/DeleteTratamento", req.body, config);
        res.json({ status: 'ok' });
    } catch (error) {
        console.error("Erro ao deletar tratamento:", error);
        res.status(500).json({ status: 'erro', message: 'Falha ao deletar.' });
    }
};
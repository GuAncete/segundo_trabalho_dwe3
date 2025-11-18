const axios = require("axios");
require('dotenv').config();

const getAxiosConfig = (req) => {
    return {
        headers: {
            'Authorization': `Bearer ${req.session.token}`
        }
    };
};

exports.getManutMoto = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        const resp = await axios.get(process.env.SERVIDOR_DW3 + "/GetAllMoto", config);
        
        res.render('moto/manut', {
            title: 'Manutenção de Motos',
            userName: req.session.userName,
            data: resp.data 
        });
    } catch (error) {
        console.error("Erro ao buscar motos:", error);
        res.render('moto/manut', {
            title: 'Manutenção de Motos',
            userName: req.session.userName,
            data: [], 
            message: "Erro ao buscar dados."
        });
    }
};

exports.getInsertMoto = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        const respClientes = await axios.get(process.env.SERVIDOR_DW3 + "/GetAllCliente", config);

        res.render('moto/form', {
            title: 'Nova Moto',
            userName: req.session.userName,
            oper: 'insert',
            data: {}, 
            clientes: respClientes.data
        });
    } catch (error) {
         console.error("Erro ao carregar form de inserção de moto:", error);
         res.redirect('/moto/manut');
    }
};

exports.postInsertMoto = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        await axios.post(process.env.SERVIDOR_DW3 + "/InsertMoto", req.body, config);
        res.redirect('/moto/manut');
    } catch (error) {
        console.error("Erro ao inserir moto:", error);

        try {
            const config = getAxiosConfig(req);
            const respClientes = await axios.get(process.env.SERVIDOR_DW3 + "/GetAllCliente", config);
            
            res.render('moto/form', {
                title: 'Nova Moto',
                userName: req.session.userName,
                oper: 'insert',
                data: req.body, 
                clientes: respClientes.data,
                message: "Erro ao salvar. Verifique os dados."
            });
        } catch (err2) {
            res.redirect('/moto/manut');
        }
    }
};

exports.getUpdateMoto = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        const id = req.params.id;

        const [respMoto, respClientes] = await Promise.all([
            axios.post(process.env.SERVIDOR_DW3 + "/GetMotoByID", { id_moto: id }, config),
            axios.get(process.env.SERVIDOR_DW3 + "/GetAllCliente", config)
        ]);
        
        res.render('moto/form', {
            title: 'Alterar Moto',
            userName: req.session.userName,
            oper: 'update',
            data: respMoto.data, 
            clientes: respClientes.data 
        });
    } catch (error) {
        console.error("Erro ao buscar moto por ID:", error);
        res.redirect('/moto/manut');
    }
};

exports.postUpdateMoto = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        await axios.post(process.env.SERVIDOR_DW3 + "/UpdateMoto", req.body, config);
        res.json({ status: 'ok' });
    } catch (error) {
        console.error("Erro ao atualizar moto:", error);
        res.status(500).json({ status: 'erro', message: 'Falha ao atualizar.' });
    }
};

exports.postDeleteMoto = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        await axios.post(process.env.SERVIDOR_DW3 + "/DeleteMoto", req.body, config);
        res.json({ status: 'ok' });
    } catch (error) {
        console.error("Erro ao deletar moto:", error);
        res.status(500).json({ status: 'erro', message: 'Falha ao deletar.' });
    }
};
const axios = require("axios");
require('dotenv').config();

const getAxiosConfig = (req) => {
    return {
        headers: {
            'Authorization': `Bearer ${req.session.token}`
        }
    };
};

exports.getManutMotoTratamento = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        const resp = await axios.get(process.env.SERVIDOR_DW3 + "/GetAllMotoTratamento", config);
        
        res.render('moto_tratamento/manut', {
            title: 'Ordens de Serviço',
            userName: req.session.userName,
            data: resp.data
        });
    } catch (error) {
        console.error("Erro ao buscar OS:", error);
        res.render('moto_tratamento/manut', {
            title: 'Ordens de Serviço',
            userName: req.session.userName,
            data: [],
            message: "Erro ao buscar dados."
        });
    }
};

exports.getInsertMotoTratamento = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        const [respMotos, respTratamentos] = await Promise.all([
            axios.get(process.env.SERVIDOR_DW3 + "/GetAllMoto", config),
            axios.get(process.env.SERVIDOR_DW3 + "/GetAllTratamento", config)
        ]);

        res.render('moto_tratamento/form', {
            title: 'Nova Ordem de Serviço',
            userName: req.session.userName,
            oper: 'insert',
            data: {},
            motos: respMotos.data,
            tratamentos: respTratamentos.data
        });
    } catch (error) {
         console.error("Erro ao carregar form:", error);
         res.redirect('/moto_tratamento/manut');
    }
};

exports.postInsertMotoTratamento = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        await axios.post(process.env.SERVIDOR_DW3 + "/InsertMotoTratamento", req.body, config);
        res.redirect('/moto_tratamento/manut');
    } catch (error) {
        console.error("Erro ao inserir OS:", error);
        res.redirect('/moto_tratamento/insert'); 
    }
};

exports.getUpdateMotoTratamento = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        const id = req.params.id;

        const [respOS, respMotos, respTratamentos] = await Promise.all([
            axios.post(process.env.SERVIDOR_DW3 + "/GetMotoTratamentoByID", { id_moto_tratamento: id }, config),
            axios.get(process.env.SERVIDOR_DW3 + "/GetAllMoto", config),
            axios.get(process.env.SERVIDOR_DW3 + "/GetAllTratamento", config)
        ]);
        
        res.render('moto_tratamento/form', {
            title: 'Editar Ordem de Serviço',
            userName: req.session.userName,
            oper: 'update',
            data: respOS.data,
            motos: respMotos.data,
            tratamentos: respTratamentos.data
        });
    } catch (error) {
        console.error("Erro ao buscar OS por ID:", error);
        res.redirect('/moto_tratamento/manut');
    }
};

exports.postUpdateMotoTratamento = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        await axios.post(process.env.SERVIDOR_DW3 + "/UpdateMotoTratamento", req.body, config);
        res.json({ status: 'ok' });
    } catch (error) {
        console.error("Erro ao atualizar OS:", error);
        res.status(500).json({ status: 'erro', message: 'Falha ao atualizar.' });
    }
};

exports.postDeleteMotoTratamento = async (req, res) => {
    try {
        const config = getAxiosConfig(req);
        await axios.post(process.env.SERVIDOR_DW3 + "/DeleteMotoTratamento", req.body, config);
        res.json({ status: 'ok' });
    } catch (error) {
        console.error("Erro ao deletar OS:", error);
        res.status(500).json({ status: 'erro', message: 'Falha ao deletar.' });
    }
};

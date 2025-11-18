const axios = require("axios");
require('dotenv').config(); 

exports.getRegister = (req, res) => {
    if (req.session.isLogged) {
        return res.redirect('/');
    }
    res.render('register', { title: 'Registrar Novo Usuário', message: '' });
};

exports.postRegister = async (req, res) => {
    const { nome_usuario, email_usuario, senha_usuario } = req.body;

    try {
        const resp = await axios.post(process.env.SERVIDOR_DW3 + "/InsertUsuario", {
            nome_usuario,
            email_usuario,
            senha_usuario,
            tipo_usuario: 1
        });
        
        if (resp.data.status !== "ok") {
            return res.render('register', { title: 'Registrar', message: resp.data.message || 'Erro ao registrar.' });
        }

        return res.redirect('/login');
        
    } catch (error) {
        let message = "Erro ao conectar com o servidor. Tente mais tarde.";
        
        if (error.response && error.response.data) {
            message = error.response.data.message || error.response.data.error || message;
        }
        
        console.error("Erro no postRegister:", error.response ? error.response.data : error.message); 
        
        res.render('register', { title: 'Registrar', message: message });
    }
};
const axios = require("axios");
require('dotenv').config(); 

exports.getLogin = (req, res) => {
    if (req.session.isLogged) {
        return res.redirect('/');
    }
    res.render('login', { title: 'Login', message: '' });
};

exports.postLogin = async (req, res) => {
    const { email_usuario, senha_usuario } = req.body;

    try {
        const resp = await axios.post(process.env.SERVIDOR_DW3 + "/Login", { 
            email_usuario, 
            senha_usuario  
        });
        
        if (resp.data.auth) {
            req.session.isLogged = true;
            req.session.userName = resp.data.nome_usuario;
            req.session.token = resp.data.token;
            return res.redirect('/');
        } else {
            return res.render('login', { title: 'Login', message: resp.data.message || 'Email ou senha inválidos' });
        }

    } catch (error) {
        console.error(error);
        let message = "Erro ao conectar com o servidor. Tente mais tarde.";
        if (error.response && error.response.status === 401) { 
             message = "Email ou senha inválidos";
        }
        res.render('login', { title: 'Login', message: message });
    }
};

exports.getLogout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/login');
    });
};
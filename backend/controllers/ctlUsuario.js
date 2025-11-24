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

    if (!id_usuario) {
      return res.status(400).json({ error: "id_usuario é obrigatório." });
    }

    const dado = await mdlUsuario.getUsuarioById(id_usuario);

    if (!dado) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.json(dado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const insertUsuario = async (req, res) => {
  try {
    const { nome_usuario, email_usuario, senha_usuario, tipo_usuario } = req.body;

    if (!nome_usuario || !email_usuario || !senha_usuario || tipo_usuario === undefined) {
      return res.status(400).json({
        error:
          "Campos nome_usuario, email_usuario, senha_usuario e tipo_usuario são obrigatórios."
      });
    }

    const usuario = await mdlUsuario.insertUsuario(req.body);

    res.status(201).json({
      status: "ok",
      id_usuario: usuario.id_usuario
    });

  } catch (error) {
    if (error.code === "23505") {
      // Verificar qual campo causou a violação de constraint única
      const constraint = (error.constraint || "").toLowerCase();
      const detail = (error.detail || "").toLowerCase();
      
      // Verificar se é email duplicado
      if (constraint.includes("email") || detail.includes("email_usuario")) {
        return res.status(409).json({
          message: "Este email já existe."
        });
      }
      
      // Caso genérico para outras constraints únicas
      return res.status(409).json({
        message: "Este email já existe."
      });
    }

    res.status(500).json({
      error: error.message
    });
  }
};


const updateUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.body;

    if (!id_usuario) {
      return res.status(400).json({ error: "id_usuario é obrigatório." });
    }

    const usuario = await mdlUsuario.updateUsuario(id_usuario, req.body);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.json(usuario);
  } catch (error) {
    if (error.code === "23505") {
      // Verificar qual campo causou a violação de constraint única
      const constraint = (error.constraint || "").toLowerCase();
      const detail = (error.detail || "").toLowerCase();
      
      // Verificar se é email duplicado
      if (constraint.includes("email") || detail.includes("email_usuario")) {
        return res.status(409).json({
          message: "Este email já existe."
        });
      }
      
      // Caso genérico para outras constraints únicas
      return res.status(409).json({
        message: "Este email já existe."
      });
    }

    res.status(500).json({ error: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.body;

    if (!id_usuario) {
      return res.status(400).json({ error: "id_usuario é obrigatório." });
    }

    const deletado = await mdlUsuario.deleteUsuario(id_usuario);

    if (!deletado) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsuario,
  getUsuarioById,
  insertUsuario,
  updateUsuario,
  deleteUsuario,
};

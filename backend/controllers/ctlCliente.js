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
    if (error.code === "23505") {
      // Verificar qual campo causou a violação de constraint única
      const constraint = (error.constraint || "").toLowerCase();
      const detail = (error.detail || "").toLowerCase();
      
      // Verificar se é CPF duplicado
      if (constraint.includes("cpf") || detail.includes("cpf_cliente")) {
        return res.status(409).json({
          message: "Este CPF já existe."
        });
      }
      
      // Verificar se é email duplicado
      if (constraint.includes("email") || detail.includes("email_cliente")) {
        return res.status(409).json({
          message: "Este email já existe."
        });
      }
      
      // Caso genérico para outras constraints únicas
      return res.status(409).json({
        message: "Dados duplicados. Verifique CPF e email."
      });
    }

    res.status(500).json({ error: error.message });
  }
};

const updateCliente = async (req, res) => {
  try {
    const { id_cliente } = req.body;
    const cliente = await mdlCliente.updateCliente(id_cliente, req.body);
    res.json(cliente);
  } catch (error) {
    if (error.code === "23505") {
      // Verificar qual campo causou a violação de constraint única
      const constraint = (error.constraint || "").toLowerCase();
      const detail = (error.detail || "").toLowerCase();
      
      // Verificar se é CPF duplicado
      if (constraint.includes("cpf") || detail.includes("cpf_cliente")) {
        return res.status(409).json({
          message: "Este CPF já existe."
        });
      }
      
      // Verificar se é email duplicado
      if (constraint.includes("email") || detail.includes("email_cliente")) {
        return res.status(409).json({
          message: "Este email já existe."
        });
      }
      
      // Caso genérico para outras constraints únicas
      return res.status(409).json({
        message: "Dados duplicados. Verifique CPF e email."
      });
    }

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

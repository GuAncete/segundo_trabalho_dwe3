const mdlTratamento = require("../models/mdlTratamento");

const getAllTratamento = async (req, res) => {
  try {
    const dados = await mdlTratamento.getAllTratamento();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTratamentoById = async (req, res) => {
  try {
    const { id_tratamento } = req.body;
    const dado = await mdlTratamento.getTratamentoById(id_tratamento);
    res.json(dado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const insertTratamento = async (req, res) => {
  try {
    const dado = await mdlTratamento.insertTratamento(req.body);
    res.json(dado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTratamento = async (req, res) => {
  try {
    const { id_tratamento } = req.body;
    const dado = await mdlTratamento.updateTratamento(id_tratamento, req.body);
    res.json(dado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTratamento = async (req, res) => {
  try {
    const { id_tratamento } = req.body;
    await mdlTratamento.deleteTratamento(id_tratamento);
    res.json({ message: "Tratamento deletado." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTratamento,
  getTratamentoById,
  insertTratamento,
  updateTratamento,
  deleteTratamento
};

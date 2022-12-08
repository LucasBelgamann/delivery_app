const service = require("../service/sales.service");

const create = async (req, res) => {
  const user = req.user;
  const body = req.body;
  console.log("body", body);

  const sales = await service.create({ ...body, user });
  return res.status(201).json({ sales });
};

const getAll = async (req, res) => {
  const result = await service.getAll();
  return res.status(200).json(result);
};

const updateStatus = async (req, res) => {
  const { status } = req.body;
  console.log("req.body;", req.body);
  const { id } = req.params;
  const result = await service.updateStatus(status,id);
  console.log("result", result);
  return res.status(200).json(result);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const result = await service.getSalesById(id);
  return res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
  updateStatus,
  getSalesById
};

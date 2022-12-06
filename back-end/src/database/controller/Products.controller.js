const service = require("../service/products.service");

const getAllProducts = async (req, res) => {
  const products = await service.getAllProducts();

  return res.status(200).json(products);
};

module.exports = { getAllProducts };

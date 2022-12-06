const { products } = require("../models");


const getAllProducts = async () => {
  return await products.findAll(); 
}

module.exports = { getAllProducts };

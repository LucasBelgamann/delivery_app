const {salesProducts } = require("../models");

const createSaleProducts = async ({products,sale_id}) => {
  const sales = [];

  Array.from(products).forEach(({product_id,quantity}) => {
    sales.push({ product_id, sale_id, quantity })})

  await salesProducts.bulkCreate(sales);
};


module.exports = { createSaleProducts }

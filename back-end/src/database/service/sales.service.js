const { sales, users, products, salesProducts } = require("../models");
const { createSaleProducts } = require("./salesProducts.service");
const { getUser } = require("./login.service");
// const { formatCurrency } = require("../../utils/formatCurrency");

const create = async ({
  seller_id,
  total_price,
  delivery_address,
  delivery_number,
  products,
  user,
}) => {
  console.log("products", products);
  const userId = await getUser(user.email);

  const sale = await sales.create({
    user_id: userId,
    seller_id,
    total_price,
    delivery_address,
    delivery_number,
  });
  console.log("sale.id", sale.id);

  await createSaleProducts({
    products,
    sale_id: sale.id,
  });

  return { id: sale.id, sale: sale };
};

const getAll = async () => {
  return await sales.findAll({
    include: [
      { model: users, as: "user" },
    ],
  });
};

const updateStatus = async (status, id) => {
  const Sales = await sales.update({ status }, { where: { id } });
  console.log("sales", Sales);
  return Sales;
};

const getSalesById = async (id) => {
  return await sales.findByPk(id, {
    include: [
      { model: users, as: "user" },
      {
        model: products,
        as: "products",
        through: { attributes: ["quantity"] },
        include: [{ model: salesProducts, as: "salesProducts" }],
      },
    ],
  });
};


const salesByUserId = async (name) => {
  const Sales = await sales.findAll({ where: { name } });
  return Sales;
};

module.exports = {
  create,
  getAll,
  updateStatus,
  getSalesById,
  salesByUserId,
};

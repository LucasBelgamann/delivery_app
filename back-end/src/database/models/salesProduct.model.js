module.exports = (sequelize, DataTypes) => {
  const salesProducts = sequelize.define(
    "salesProducts",
    {
      sale_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      product_id: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
      quantity: DataTypes.INTEGER,
    },
    {
      underscore: true,
      tableName: "salesProducts",
      timestamp: false,
    }
  );

  salesProducts.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: "products",
      through: salesProducts,
      foreignKey: "sale_id",
      otherKey: "product_id",
    });

    models.products.belongsToMany(models.products, {
      as: "sales",
      through: salesProducts,
      foreignKey: "product_id",
      otherKey: "sale_id",
    });
  };

  return salesProducts;
};

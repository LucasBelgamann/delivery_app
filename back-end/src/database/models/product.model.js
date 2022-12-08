module.exports = (sequelize,DataTypes) => {
  const products = sequelize.define('products',{
    id: {
      type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,
    },
    name: DataTypes.STRING(100),
    price: DataTypes.DECIMAL(4,2),
    url_image: DataTypes.STRING(200),
  }, {
    // underscore: true,
    tableName: 'products',
    timestamps: false,
  });

  products.associate = (models) => {
    products.hasMany(models.salesProducts,
      {foreignKey: 'product_id' , as: 'products'})
  }

  return products;


}

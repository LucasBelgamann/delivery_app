module.exports = (sequelize,DataTypes) => {
  const sales = sequelize.define('sales',{
    id: {
      type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER, foreignKey: true
    },
    seller_id: {
      type: DataTypes.INTEGER, foreignKey: true
    },
    total_price: DataTypes.DECIMAL(9,2),
    delivery_address: DataTypes.STRING(100),
    delivery_number:DataTypes.STRING(50),
    sale_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    status: { type: DataTypes.STRING(50), defaultValue: 'Pendente' },
  }, {
    // underscore: true,
    tableName: 'sales',
    timestamps: false,
  });

  sales.associate = (models) => {
    sales.belongsTo(models.users,
      {foreignKey:'user_id', as: 'user'},
      {foreignKey:'seller_id', as: 'seller'});
  }


  return sales;


}

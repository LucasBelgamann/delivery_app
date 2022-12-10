module.exports = (sequelize,DataTypes) => {
  const users = sequelize.define('users',{
    id: {
      type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,
    },
    name: DataTypes.STRING(255),
    email: DataTypes.STRING(255),
    password: DataTypes.STRING(255),
    role: {type: DataTypes.STRING(255), defaultValue: 'customer'},
  }, {
    // underscore: true,
    tableName: 'users',
    timestamps: false,
  });

  users.associate = (models) => {
    users.hasMany(models.sales,{ foreignKey: 'user_id', as: 'customer' });
    users.hasMany(models.sales,{ foreignKey: 'seller_id', as: 'seller' });
  };


  return users;


}

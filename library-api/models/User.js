const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {}

  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      address: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, unique: true },
      phone: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};

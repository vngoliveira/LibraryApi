const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Model {}

  Book.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      author: { type: DataTypes.STRING, allowNull: false },
      genre: { type: DataTypes.STRING },
      publicationYear: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: 'Book',
    }
  );

  return Book;
};

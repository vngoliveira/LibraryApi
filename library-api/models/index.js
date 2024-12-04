const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Loan = require('./Loan')(sequelize);
const Book = require('./Book')(sequelize);
const User = require('./User')(sequelize);

Loan.belongsTo(Book, { foreignKey: 'bookId' });
Loan.belongsTo(User, { foreignKey: 'userId' });
Book.hasMany(Loan, { foreignKey: 'bookId' });
User.hasMany(Loan, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  Loan,
  Book,
  User,
};

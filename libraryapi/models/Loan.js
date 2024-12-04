const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Loan extends Model {}

  Loan.init(
    {
      loanDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      returnDate: { type: DataTypes.DATE },
      returned: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'Loan',
    }
  );

  return Loan;
};


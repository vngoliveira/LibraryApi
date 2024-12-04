const { sequelize, Loan, Book, User } = require('../models');

exports.getMostLoanedBooks = async (req, res) => {
  try {
    const books = await Loan.findAll({
      attributes: ['bookId', [sequelize.fn('COUNT', 'bookId'), 'loanCount']],
      include: [{ model: Book, attributes: ['title'] }],
      group: ['bookId', 'Book.id'],
      order: [[sequelize.literal('loanCount'), 'DESC']],
      limit: 5,
    });

    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsersWithPendingLoans = async (req, res) => {
  try {
    const users = await Loan.findAll({
      where: { returned: false },
      include: [{ model: User, attributes: ['name', 'email'] }],
    });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

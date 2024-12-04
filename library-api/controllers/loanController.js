const { Loan, Book, User } = require('../models');


exports.createLoan = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const activeLoans = await Loan.count({
      where: { userId, returned: false },
    });
    if (activeLoans >= 3) {
      return res.status(400).json({ message: 'User has reached loan limit' });
    }

    const loan = await Loan.create(req.body);
    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.returnLoan = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Loan.update(
      { returned: true, returnDate: new Date() },
      { where: { id } }
    );

    if (updated[0]) {
      res.status(200).json({ message: 'Book returned successfully' });
    } else {
      res.status(404).json({ message: 'Loan not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllLoans = async (req, res) => {
    try {
      const loans = await Loan.findAll({
        include: [
          {
            model: Book,
            attributes: ['title', 'author'], 
          },
          {
            model: User,
            attributes: ['name', 'email'], 
          },
        ],
      });
  
      res.status(200).json(loans); 
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

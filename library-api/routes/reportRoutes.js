const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/most-loaned-books', reportController.getMostLoanedBooks);
router.get('/pending-loans', reportController.getUsersWithPendingLoans);

module.exports = router;

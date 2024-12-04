const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

router.post('/', loanController.createLoan);
router.get('/', loanController.getAllLoans);
router.put('/return/:id', loanController.returnLoan);

module.exports = router;

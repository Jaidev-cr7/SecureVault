const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getTransactions, createTransaction, deleteTransaction } = require('../controllers/transactionController');

// @route   GET api/transactions
// @desc    Get all transactions for a user
// @access  Private
router.get('/', authMiddleware, getTransactions);

// @route   POST api/transactions
// @desc    Add new transaction
// @access  Private
router.post('/', authMiddleware, createTransaction);

// @route   DELETE api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', authMiddleware, deleteTransaction);

module.exports = router;

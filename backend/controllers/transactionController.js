const Transaction = require('../models/Transaction');
const AuditLog = require('../models/AuditLog');

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.createTransaction = async (req, res) => {
    try {
        const { type, amount, category, description } = req.body;

        const newTransaction = new Transaction({
            userId: req.user.id,
            type,
            amount,
            category,
            description
        });

        const transaction = await newTransaction.save();

        // Create Audit Log
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const log = new AuditLog({
            userId: req.user.id,
            action: 'CREATE_TRANSACTION',
            transactionId: transaction._id,
            amount: transaction.amount,
            ipAddress
        });
        await log.save();

        res.status(201).json(transaction);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        // Make sure user owns the transaction
        if (transaction.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const { amount, _id } = transaction;

        await Transaction.findByIdAndDelete(req.params.id);

        // Create Audit Log
        const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const log = new AuditLog({
            userId: req.user.id,
            action: 'DELETE_TRANSACTION',
            transactionId: _id,
            amount: amount,
            ipAddress
        });
        await log.save();

        res.json({ message: 'Transaction removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.status(500).send('Server Error');
    }
};

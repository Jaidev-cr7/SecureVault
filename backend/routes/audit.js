const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const AuditLog = require('../models/AuditLog');

// @route   GET api/logs
// @desc    Get all audit logs for a user
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
    try {
        const logs = await AuditLog.find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .populate('transactionId', 'category description'); // Optional: bringing some details
        res.json(logs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

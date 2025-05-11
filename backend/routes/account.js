const express = require('express');
const mongoose = require('mongoose');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    const account = await Account.findOne({ userId: req.userId })

    if (!account) {
        return res.status(404).json({ message: "Account not found" });
    }

    res.status(200).json({
        balance: account.balance
    });


});

router.post('/transfer',authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const {to ,amount} = req.body;

    if (!to || !amount) {
        return res.status(400).json({ message: "Please provide all required fields" });
    }

    const fromAccount = await Account.findOne({ userId: req.userId }).session(session);
    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!fromAccount || !toAccount) {
        await session.abortTransaction();
        return res.status(404).json({ message: "Account not found" });
    }

    if (fromAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Insufficient balance" });
    }



    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    await session.commitTransaction();
    res.status(200).json({ message: "Transfer successful" });
});   
module.exports = router;
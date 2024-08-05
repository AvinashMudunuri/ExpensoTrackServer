const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  amount: { type: Number, required: true },
  transactionCategory: {
    type: String,
    enum: ['Food', 'Mediciens', 'Groceries'],
    requires: true,
  },
  transactionType: {
    type: String,
    enum: ['Credit', 'Debit'],
    required: true,
  },
  paymentModeId: {
    type: Schema.Types.ObjectId,
    ref: 'PaymentMode',
    required: true,
  },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, required: false },
});

module.exports = mongoose.model('transaction', transactionSchema);

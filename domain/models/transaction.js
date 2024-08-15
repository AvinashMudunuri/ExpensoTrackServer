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
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'TransactionCategory',
    requires: true,
  },
  transactionTypeId: {
    type: Schema.Types.ObjectId,
    ref: 'TransactionType',
    requires: true,
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

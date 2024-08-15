const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accountName: { type: String, required: true },
  accountType: {
    type: String,
    enum: ['Debit Card', 'Credit Card', 'Loan', 'Investment'],
    required: true,
  },
  balance: { type: Number, required: true },
});

module.exports = mongoose.model('account', accountSchema);

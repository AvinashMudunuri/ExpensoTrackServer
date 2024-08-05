const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investmentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  investmentName: { type: String, required: true },
  investmentType: {
    type: String,
    enum: ['RD', 'FD', 'Mutual Funds', 'Gold'],
    required: true,
  },
  frequency: { type: String, required: true, enum: ['Monthly', 'Quartely', 'Half-Yearly', 'Yearly']},
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('investment', investmentSchema);

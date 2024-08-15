const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  billName: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  isPaid: { type: Boolean, default: false, required: true },
});

module.exports = mongoose.model('bill', billSchema);

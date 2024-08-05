const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  loanName: { type: String, required: true },
  prinicipalAmount: { type: Number, required: true },
  outStandingAmount: { type: Number, required: true },
  monthlyEMI: { type: Number, required: true },
  interstRate: { type: Number, required: true },
  dueDate: { type: Date, required: true },
});

module.exports = mongoose.model('loan', loanSchema);

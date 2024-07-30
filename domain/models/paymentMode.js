const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentModeSchema = new Schema({
  mode_name: {
    type: String,
    enum: ['DEBIT CARD', 'CREDIT CARD', 'BANK TRANSFER', 'WALLET', 'CASH'],
    required: true,
    unique: true,
  },
  label: { type: String },
  value: { type: String },
});

paymentModeSchema.pre('save', async function (next) {
  this.label = this.mode_name;
  this.value = this.mode_name;
  next();
});

module.exports = mongoose.model('PaymentMode', paymentModeSchema);

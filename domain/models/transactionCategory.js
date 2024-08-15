const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  label: { type: String },
  value: { type: String },
});

transactionCategorySchema.pre('save', async function (next) {
  this.label = this.name;
  this.value = this.name;
  next();
});

module.exports = mongoose.model(
  'TransactionCategory',
  transactionCategorySchema
);

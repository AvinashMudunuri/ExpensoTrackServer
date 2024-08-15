const TransactionType = require('../models/transactionType');

class TransactionTypeRepository {
  async createTransactionType(data) {
    const tt = new TransactionType(data);
    return await tt.save();
  }
  async getAllTransactionTypes() {
    return await TransactionType.find();
  }
  async getTransactionTypeById(id) {
    return await TransactionType.findById(id);
  }
  async getTransactionTypeByName(name) {
    return await TransactionType.findOne({ name: name });
  }
  async updateTransactionTypeById(id, data) {
    return await TransactionType.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteTransactionTypeById(id) {
    return await TransactionType.findByIdAndDelete(id);
  }
}

module.exports = new TransactionTypeRepository();

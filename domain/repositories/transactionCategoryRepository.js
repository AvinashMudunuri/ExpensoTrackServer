const TransactionCategory = require('../models/transactionCategory');

class TransactionCategoryRepository {
  async createTransactionCategory(data) {
    const tc = new TransactionCategory(data);
    return await tc.save();
  }
  async getAllTransactionCategories() {
    return await TransactionCategory.find();
  }
  async getTransactionCategoryById(id) {
    return await TransactionCategory.findById(id);
  }
  async getTransactionCategoryByName(name) {
    return await TransactionCategory.findOne({ name: name });
  }
  async updateTransactionCategoryById(id, data) {
    return await TransactionCategory.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteTransactionCategoryById(id) {
    return await TransactionCategory.findByIdAndDelete(id);
  }
}

module.exports = new TransactionCategoryRepository();

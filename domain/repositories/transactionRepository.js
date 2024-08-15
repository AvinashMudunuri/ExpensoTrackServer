const Transaction = require('../models/transaction');
class TransactionRepository {
  async createTransaction(data) {
    const transaction = new Transaction(data);
    return await transaction.save();
  }
  async getTransactions(query) {
    const { page = 1, limit = 10 } = query;
    const transactions = await Transaction.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();
    const count = await Transaction.countDocuments();
    const response = {
      transactions,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
    return response;
  }
}

module.exports = new TransactionRepository();

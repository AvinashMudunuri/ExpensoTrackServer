const Transaction = require('../models/transaction');
class TransactionRepository {
  async createTransaction(data) {
    const transaction = new Transaction(data);
    return await transaction.save();
  }
}

module.exports = new TransactionRepository();

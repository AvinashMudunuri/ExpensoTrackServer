const transactionRepository = require('../repositories/transactionRepository');

class TransactionService {
  async createTransaction(data) {
    return await transactionRepository.createTransaction(data);
  }
  async getTransactions(query) {
    return await transactionRepository.getTransactions(query);
  }
}

module.exports = new TransactionService();

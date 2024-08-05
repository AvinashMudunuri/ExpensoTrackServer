const transactionRepository = require('../repositories/transactionRepository');

class TransactionService {
  async createTransaction(data) {
    return await transactionRepository.createTransaction(data);
  }
}

module.exports = new TransactionService();

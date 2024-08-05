const transactionService = require('../domain/services/transactionService');

class TransactionController {
  async createTransaction(req, res) {
    try {
      const acc = await transactionService.createTransaction(req.body);
      res.status(201).json({
        msg: 'Transaction logged successfully',
        data: acc,
      });
    } catch (ex) {
      res.status(400).send({ error: ex.message });
    }
  }
}

module.exports = new TransactionController();

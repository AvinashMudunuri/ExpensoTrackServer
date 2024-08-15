const transactionTypeService = require('../domain/services/transactionTypeService');

class TransactionTypeController {
  async createTransactionType(req, res) {
    try {
      const tc = await transactionTypeService.createTransactionType(req.body);
      res.status(201).json({
        msg: 'Transaction Category added successfully',
        data: tc,
      });
    } catch (ex) {
      res.status(400).send({ error: ex.message });
    }
  }

  async getAllTransactionTypes(req, res) {
    try {
      const tcs = await transactionTypeService.getAllTransactionTypes();
      res.status(200).send(tcs);
    } catch (ex) {
      res.status(500).send(ex);
    }
  }

  async getTransactionTypeById(req, res, next) {
    try {
      const tc = await transactionTypeService.getTransactionTypeById(req.params.id);
      res.status(200).json(tc);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }

  async updateTransactionTypeById(req, res, next) {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const user = await transactionTypeService.updateTransactionTypeById(
        id,
        updateData
      );
      res.status(200).json(user);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }

  async deleteTransactionTypeById(req, res, next) {
    try {
      const pm = await transactionTypeService.deleteTransactionTypeById(req.params.id);
      res.status(200).json(pm);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }
}

module.exports = new TransactionTypeController();

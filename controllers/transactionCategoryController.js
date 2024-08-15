const transactionCategoryService = require('../domain/services/transactionCategoryService');

class TransactionCategoryController {
  async createTransactionCategory(req, res) {
    try {
      const tc = await transactionCategoryService.createTransactionCategory(req.body);
      res.status(201).json({
        msg: 'Transaction Category added successfully',
        data: tc,
      });
    } catch (ex) {
      res.status(400).send({ error: ex.message });
    }
  }

  async getAllTransactionCategories(req, res) {
    try {
      const tcs = await transactionCategoryService.getAllTransactionCategories();
      res.status(200).send(tcs);
    } catch (ex) {
      res.status(500).send(ex);
    }
  }

  async getTransactionCategoryById(req, res, next) {
    try {
      const tc = await transactionCategoryService.getTransactionCategoryById(req.params.id);
      res.status(200).json(tc);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }

  async updateTransactionCategoryById(req, res, next) {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const user = await transactionCategoryService.updateTransactionCategoryById(
        id,
        updateData
      );
      res.status(200).json(user);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }

  async deleteTransactionCategoryById(req, res, next) {
    try {
      const pm = await transactionCategoryService.deleteTransactionCategoryById(req.params.id);
      res.status(200).json(pm);
    } catch (ex) {
      res.status(500).send({ error: ex.message });
      next();
    }
  }
}

module.exports = new TransactionCategoryController();

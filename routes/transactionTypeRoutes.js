const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const grantAccess = require('../middleware/grantAccess');
const { cacheMiddleware } = require('../middleware/cache');

const transactionTypeController = require('../controllers/transactionTypeController');

router.post('/', auth, grantAccess('createOwn', 'expense'), async (req, res) =>
  transactionTypeController.createTransactionType(req, res)
);

router.get('/', auth, grantAccess('readOwn', 'expense'), async (req, res) =>
  transactionTypeController.getAllTransactionTypes(req, res)
);

router.get(
  '/:id',
  auth,
  grantAccess('readOwn', 'expense'),
  cacheMiddleware('TC'),
  async (req, res, next) => {
    try {
      await transactionTypeController.getTransactionTypeById(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  '/:id',
  auth,
  grantAccess('updateOwn', 'expense'),
  async (req, res, next) => {
    try {
      await transactionTypeController.updateTransactionTypeById(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  auth,
  grantAccess('deleteOwn', 'expense'),
  async (req, res, next) => {
    try {
      await transactionTypeController.deleteTransactionTypeById(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

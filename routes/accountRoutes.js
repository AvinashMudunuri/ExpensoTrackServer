const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const grantAccess = require('../middleware/grantAccess');
const { cacheMiddleware } = require('../middleware/cache');

const accountController = require('../controllers/accountController');

router.post('/', auth, grantAccess('createOwn', 'expense'), async (req, res) =>
  accountController.createAccount(req, res)
);

router.get('/', auth, grantAccess('readOwn', 'expense'), async (req, res) =>
  accountController.getAllAccounts(req, res)
);

router.get(
  '/:id',
  auth,
  grantAccess('readOwn', 'expense'),
  cacheMiddleware('ACCOUNT'),
  async (req, res, next) => {
    try {
      await accountController.getAccountById(req, res, next);
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
      await accountController.updateAccountById(req, res, next);
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
      await accountController.deleteAccountById(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

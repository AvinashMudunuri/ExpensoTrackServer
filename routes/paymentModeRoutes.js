const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const grantAccess = require('../middleware/grantAccess');
const { cacheMiddleware } = require('../middleware/cache');

const paymentModeController = require('../controllers/paymentModeController');

router.post('/', auth, grantAccess('createOwn', 'expense'), async (req, res) =>
  paymentModeController.createPaymentMode(req, res)
);

router.get('/', auth, grantAccess('readOwn', 'expense'), async (req, res) =>
  paymentModeController.getAllPaymentModes(req, res)
);

router.get(
  '/:id',
  auth,
  grantAccess('readOwn', 'expense'),
  cacheMiddleware('PM'),
  async (req, res, next) => {
    try {
      await paymentModeController.getPaymentModeById(req, res, next);
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
      await paymentModeController.updatePaymentModeById(req, res, next);
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
      await paymentModeController.deletePaymentModeById(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

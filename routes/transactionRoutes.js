const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const grantAccess = require('../middleware/grantAccess');

const transactionController = require('../controllers/transactionController');

router.post('/', auth, grantAccess('createOwn', 'expense'), async (req, res) =>
  transactionController.createTransaction(req, res)
);


module.exports = router;
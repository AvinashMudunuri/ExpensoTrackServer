const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const grantAccess = require('../middleware/grantAccess');

const accountController = require('../controllers/accountController');

router.post('/', auth, grantAccess('createOwn', 'expense'), async (req, res) =>
  accountController.createAccount(req, res)
);

module.exports = router;
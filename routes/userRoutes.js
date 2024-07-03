const express = require('express');
const auth = require('../middleware/auth');
const grantAccess = require('../middleware/grantAccess');

const router = express.Router();

const userController = require('../controllers/userController');

router.post('/auth/register', async (req, res) =>
  userController.createUser(req, res)
);

router.post('/auth/login', async (req, res) => userController.login(req, res));

router.get('/', auth, grantAccess('readOwn', 'profile'), async (req, res) =>
  userController.getAllUsers(req, res)
);

router.get('/:id', auth, grantAccess('readOwn', 'profile'), async (req, res) =>
  userController.getUserById(req, res)
);

module.exports = router;

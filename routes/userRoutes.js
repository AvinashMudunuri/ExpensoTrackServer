const express = require('express');
const auth = require('../middleware/auth');
const grantAccess = require('../middleware/grantAccess');
const { cacheMiddleware } = require('../middleware/cache');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/auth/register', async (req, res) =>
  userController.createUser(req, res)
);

router.post('/auth/login', async (req, res) => userController.login(req, res));

router.get('/', auth, grantAccess('readOwn', 'profile'), async (req, res) =>
  userController.getAllUsers(req, res)
);

router.get(
  '/:id',
  auth,
  grantAccess('readOwn', 'profile'),
  cacheMiddleware('user'),
  async (req, res, next) => {
    try {
      await userController.getUserById(req, res, next);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

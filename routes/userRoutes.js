const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', async (req, res) => userController.createUser(req, res));

router.get('/', async (req, res) => userController.getAllUsers(req, res));

module.exports = router;

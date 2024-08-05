const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const grantAccess = require('../middleware/grantAccess');
const { cacheMiddleware } = require('../middleware/cache');

const investmentController = require('../controllers/investmentController');


module.exports = router;
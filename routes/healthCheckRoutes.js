const express = require('express');
const { checkRedisConnection } = require('../infrastructure/redis');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const isRedisConnected = await checkRedisConnection();
    if (isRedisConnected) {
      res.status(200).json({
        status: 'OK',
        message: 'Redis Connection is healthy',
      });
    } else {
      res.status(500).json({
        status: 'ERROR',
        message: 'Redis Connection is failed',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Redis Connection is failed',
      error: error.message,
    });
  }
});

module.exports = router;

const express = require('express');
const { checkRedisConnection } = require('../infrastructure/redis');
const { checkMongoDBConnection } = require('../infrastructure/database');
const router = express.Router();

router.get('/redis', async (req, res) => {
  try {
    const isRedisConnected = await checkRedisConnection();
    if (isRedisConnected) {
      res.status(200).json({
        status: 'OK',
        message: 'Redis Connection is healthy',
        ragStatus: 'GREEN',
      });
    } else {
      res.status(500).json({
        status: 'ERROR',
        message: 'Redis Connection is failed',
        ragStatus: 'RED',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'Redis Connection is failed',
      ragStatus: 'RED',
      error: error.message,
    });
  }
});

router.get('/db', async (req, res) => {
  try {
    const isMongoDBConnected = await checkMongoDBConnection();
    if (isMongoDBConnected) {
      res.status(200).json({
        status: 'OK',
        message: 'MongoDB Connection is healthy',
        ragStatus: 'GREEN',
      });
    } else {
      res.status(500).json({
        status: 'ERROR',
        message: 'MongoDB Connection is failed',
        ragStatus: 'RED',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: 'MongoDB Connection is failed',
      ragStatus: 'RED',
      error: error.message,
    });
  }
});

module.exports = router;

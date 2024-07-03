const redis = require('redis');
const config = require('../config/config');
const { logger } = require('./logger');

const redisClient = redis.createClient({
  password: config.redis.password,
  socket: {
      host: config.redis.host,
      port: config.redis.port
  }
});

const deleteRedisKey = async (key) => {
  try {
    const result = await redisClient.del(key);
    if (result === 1) {
      logger.info(`Redis key ${key} deleted successfully`);
    } else {
      logger.info(`Redis key ${key} not found`);
    }
  } catch (error) {
    logger.error('Error deleting Redis key:', error);
  }
};

const checkRedisConnection = async () => {
  try {
    await redisClient.ping();
    return true;
  } catch (err) {
    logger.info('Redis Connection error', err);
    return false;
  }
} 

const disconnectRedis = async () => {
  try {
    await redisClient.quit();
    logger.info('Redis client disconnected');
  } catch (error) {
    logger.error('Error disconnecting Redis client:', error);
  }
};

redisClient.on('error', (err) => {
  logger.info('Redis Error', err);
})

redisClient.on('connect', (err) => {
  logger.info('Redis Connection Successfully', err);
})

redisClient.connect().catch((ex) => logger.info('Redis Error', ex));

module.exports = {
  redisClient,
  checkRedisConnection,
  deleteRedisKey,
  disconnectRedis
};

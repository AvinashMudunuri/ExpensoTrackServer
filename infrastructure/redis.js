const redis = require('redis');
const config = require('../config/config');
const { serverLogger } = require('./logger');

const redisClient = redis.createClient({
  password: config.redis.password,
  socket: {
    host: config.redis.host,
    port: config.redis.port,
  },
});

const setRedisKey = async (key, data) => {
  await redisClient.set(key, JSON.stringify(data), 'EX', 3600); // Cache for 1 hour
}

const getRedisKey = async (key) => {
  const data = await redisClient.get(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
}

const deleteRedisKey = async (key) => {
  try {
    const result = await redisClient.del(key);
    if (result === 1) {
      serverLogger.info(`Redis key ${key} deleted successfully`);
    } else {
      serverLogger.info(`Redis key ${key} not found`);
    }
  } catch (error) {
    serverLogger.error('Error deleting Redis key:', error);
  }
};

const checkRedisConnection = async () => {
  try {
    await redisClient.ping();
    return true;
  } catch (err) {
    serverLogger.info('Redis Connection error', err);
    return false;
  }
};

const disconnectRedis = async () => {
  const isRedisConnected = await checkRedisConnection();
  if (isRedisConnected) {
    try {
      await redisClient.quit();
      serverLogger.info('Redis client disconnected');
    } catch (error) {
      serverLogger.error('Error disconnecting Redis client:', error);
    }
  }
};

redisClient.on('error', (err) => {
  serverLogger.info('Redis Error', err);
});

redisClient.on('connect', (err) => {
  serverLogger.info('Redis Connection Successfully', err);
});

redisClient.connect().catch((ex) => serverLogger.info('Redis Error', ex));

module.exports = {
  redisClient,
  setRedisKey,
  getRedisKey,
  checkRedisConnection,
  deleteRedisKey,
  disconnectRedis,
};

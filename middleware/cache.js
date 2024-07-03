const { redisClient } = require('../infrastructure/redis');
const { logger } = require('../infrastructure/logger');

// Middleware to check cache
const cacheMiddleware = (keyPrefix) => async (req, res, next) => {
  const key = `${keyPrefix}::${req.params.id}`;
  try {
    const cacheData = await redisClient.get(key);
    if (cacheData) {
      logger.info(`Cache found for ${key}`);
      return res.json(JSON.parse(cacheData));
    }
    next();
  } catch (ex) {
    logger.info('Cache Middleware Error', ex);
    next()
  }
};

module.exports = {
  cacheMiddleware
};
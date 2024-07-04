const { getRedisKey } = require('../infrastructure/redis');
const { middlewareLogger } = require('../infrastructure/logger');

// Middleware to check cache
const cacheMiddleware = (keyPrefix) => async (req, res, next) => {
  const key = `${keyPrefix}::${req.params.id}`;
  try {
    const cacheData = await getRedisKey(key);
    if (cacheData) {
      middlewareLogger.info(`Cache found for ${key}`);
      return res.json(cacheData);
    }
    next();
  } catch (ex) {
    middlewareLogger.info('Cache Middleware Error', ex);
    next();
  }
};

module.exports = {
  cacheMiddleware,
};

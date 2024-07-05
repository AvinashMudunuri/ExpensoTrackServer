require('dotenv').config();
module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGODB_URI,
  mongoURITest: process.env.MONGODB_URI_TEST,
  mongoURIProd: process.env.MONGODB_URI_PROD,
  jwtSecret: process.env.JWT_SECRET,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
};

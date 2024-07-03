require('dotenv').config();
module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGODB_URI,
  mongoURITest: process.env.MONGODB_URI_TEST,
  jwtSecret: process.env.JWT_SECRET,
}
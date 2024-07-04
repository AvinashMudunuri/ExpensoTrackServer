const mongoose = require('mongoose');
const { logger } = require('./logger');
const config = require('../config/config');
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    logger.info('Database Connected');
  } catch (err) {
    logger.error('Failed to connect', err);
    process.exit(1);
  }
};

const connectTestDB = async () => {
  try {
    await mongoose.connect(config.mongoURITest);
    logger.info('Test Database Connected');
  } catch (err) {
    logger.error('Failed to connect', err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info('Database disconnected');
  } catch (err) {
    logger.error('Failed to disconnect from MongoDB', err);
  }
};

const checkMongoDBConnection = async () => {
  try {
    await mongoose.connection.db.admin().ping();
    return true;
  } catch (err) {
    logger.info('MongoDB Connection error', err);
    return false;
  }
}

module.exports = {
  connectDB,
  connectTestDB,
  disconnectDB,
  checkMongoDBConnection,
};

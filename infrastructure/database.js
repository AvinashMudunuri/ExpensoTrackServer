const mongoose = require('mongoose');
const { serverLogger } = require('./logger');
const config = require('../config/config');
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI);
    serverLogger.info('Database Connected');
  } catch (err) {
    serverLogger.error('Failed to connect', err);
    process.exit(1);
  }
};

const connectTestDB = async () => {
  try {
    await mongoose.connect(config.mongoURITest);
    serverLogger.info('Test Database Connected');
  } catch (err) {
    serverLogger.error('Failed to connect', err);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    serverLogger.info('Database disconnected');
  } catch (err) {
    serverLogger.error('Failed to disconnect from MongoDB', err);
  }
};

const checkMongoDBConnection = async () => {
  try {
    await mongoose.connection.db.admin().ping();
    return true;
  } catch (err) {
    serverLogger.info('MongoDB Connection error', err);
    return false;
  }
};

module.exports = {
  connectDB,
  connectTestDB,
  disconnectDB,
  checkMongoDBConnection,
};

const mongoose = require('mongoose');
const { logger } = require('./logger');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('Database Connected', process.env.MONGODB_URI);
  } catch (err) {
    logger.error('Failed to connect', err);
    process.exit(1);
  }
};

const connectTestDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://amudunuri:RXVXMAGfvg4L1yXU@expensecluster.dyqqo0p.mongodb.net/ExpensoTrack_test');
    logger.info('Database Connected');
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

module.exports = {
  connectDB,
  connectTestDB,
  disconnectDB,
};

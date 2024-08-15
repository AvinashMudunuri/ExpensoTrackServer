const TransactionCategory = require('../domain/models/transactionCategory');
const TransactionType= require('../domain/models/transactionType');
const { connectDB, connectTestDB, connectProdDB, disconnectDB } = require('../infrastructure/database');
const { serverLogger } = require('../infrastructure/logger');
const { categories, transactionTypes } = require('../data/index');
const config = require('../config/config');

// Access command-line arguments
const args = process.argv.slice(2);
const DOMAIN_ARG = args.find(arg => arg.startsWith('domain='));
const DOMAIN = DOMAIN_ARG ? DOMAIN_ARG.split('=')[1] : undefined;
const ENVIRONMENT = config.env;

const databaseMapper = {
  'test': connectTestDB,
  'production': connectProdDB,
  'default': connectDB
};

const domainMapper = {
  'Category': {
    model: TransactionCategory,
    data: categories
  },
  "Type": {
    model: TransactionType,
    data: transactionTypes 
  }
};


async function seedDatabase() {
  try {
    const connect = databaseMapper[ENVIRONMENT] || databaseMapper['default'];
    await connect();
    serverLogger.info('Database Connection Success!!');
    serverLogger.info(`Starting Seed Data for ${DOMAIN} Model`);

    const { model, data } = domainMapper[DOMAIN] || {};

    if (model && data) {
      await model.deleteMany({});
      await model.insertMany(data);
      serverLogger.info(`${DOMAIN} have been seeded`);
    } else {
      throw new Error(`Invalid domain: ${DOMAIN}`);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Database connection error:', err);
  } finally {
    disconnectDB();
  }
}

seedDatabase();
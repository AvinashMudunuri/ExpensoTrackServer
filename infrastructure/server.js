const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const morgan = require('morgan');
const cors = require("cors");

const config = require('../config/config');
const { connectDB, connectTestDB, connectProdDB } = require('./database');
const { apiLogger, serverLogger } = require('./logger');

const whiteList = ['http://localhost:8000', 'https://super-duper-robot-4pwvgw9r7fqxg9-8000.app.github.dev'];
const corsOptions = {
  origin: function (origin, callback) {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not Allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,PATCH,HEAD,DELETE',
  credentials: true,
  optionSuccessStatus: 204,
}

const app = express();
const PORT = config.port || 8000;

// Trust Heroku's proxy
app.set('trust proxy', 1);
app.use(
  morgan('dev', {
    stream: {
      write: (message) => apiLogger.info(message.trim()),
    },
  })
);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(helmet());
app.use(xss());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 mins
  max: 100, // limit each IP to 100 requests per minute
});

app.use(limiter);

switch (config.env) {
  case 'test':
    connectTestDB().then(() => serverLogger.info('Test Connection Success!!'));
    break;
  case 'production':
    connectProdDB().then(() => serverLogger.info('Prod Connection Success!!'));
    break;
  default:
    connectDB().then(() => serverLogger.info('Dev Connection Success!!'));
}

const userRoutes = require('../routes/userRoutes');
const healthRoutes = require('../routes/healthCheckRoutes');
const paymentModeRoutes = require('../routes/paymentModeRoutes');
const accountRoutes = require('../routes/accountRoutes');
const transactionRoutes = require('../routes/transactionRoutes');
const transactionCategoryRoutes = require('../routes/transactionCategoryRoutes');
const transactionTypes = require('../routes/transactionTypeRoutes');

app.use('/api/users', userRoutes);
app.use('/health', healthRoutes);
app.use('/api/paymentmode', paymentModeRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/transactionCategory', transactionCategoryRoutes);
app.use('/api/transactionType', transactionTypes);

app.get('/', (req, res) => {
  res.send('ExpensoTracker API');
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    serverLogger.info(`Server is running on ${PORT}`);
  });
}

module.exports = app;

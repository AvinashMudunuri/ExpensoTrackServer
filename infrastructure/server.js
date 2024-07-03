const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const config = require('../config/config');
const { connectDB, connectTestDB } = require('./database');
const { logger } = require('./logger');

const app = express();
const PORT = config.port || 8000;

app.use(bodyParser.json());
app.use(helmet());
app.use(xss());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 mins
  max: 100, // limit each IP to 100 requests per minute
});

app.use(limiter);

if (config.env === 'test') {
  connectTestDB().then(() => logger.info('Test Connection Success!!'));
} else {
  connectDB().then(() => logger.info('Connection Success!!'));
}

const userRoutes = require('../routes/userRoutes');
const healthRoutes = require('../routes/healthCheckRoutes');

app.use('/api/users', userRoutes);
app.use('/health', healthRoutes);

app.get('/', (req, res) => {
  res.send('ExpensoTracker API');
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    logger.info(`Server is running on ${PORT}`);
  });
}


module.exports = app;

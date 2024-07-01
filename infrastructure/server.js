const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const { connectDB } = require('./database');
const { logger } = require('./logger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(helmet());
app.use(xss());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 mins
  max: 100, // limit each IP to 100 requests per minute
});

app.use(limiter);

connectDB().then(() => logger.info('Connection Success!!'));

const userRoutes = require('../routes/userRoutes');

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('ExpensoTracker API');
});

app.listen(PORT, () => {
  logger.info(`Server is running on ${PORT}`);
});

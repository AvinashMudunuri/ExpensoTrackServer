const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, splat, errors } = format;
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const customLogger = (label) => {
  return createLogger({
    format: combine(
      format.label({ label }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
      customFormat,
      errors({ stack: true }),
      splat()
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'error.log', level: 'error' }),
      new transports.File({ filename: 'combined.log' }),
    ],
  });
};

const serverLogger = customLogger('Express Server');
const userModuleLogger = customLogger('User Module');
const middlewareLogger = customLogger('Middleware');
const apiLogger = customLogger('API Requests');

module.exports = {
  apiLogger,
  serverLogger,
  userModuleLogger,
  middlewareLogger,
};

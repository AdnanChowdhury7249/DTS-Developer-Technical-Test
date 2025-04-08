const winston = require('winston');

const logger = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'errors.log' }),
  ],
});

const errorHandler = (err, req, res, next) => {
  logger.error(` ${err.message}`);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;

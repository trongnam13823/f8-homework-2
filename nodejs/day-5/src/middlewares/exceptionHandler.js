const serverConfig = require('../configs/server.config');
const ApiError = require('../utils/ApiError');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err instanceof ApiError) {
    return res.error(err.statusCode, err.message);
  }

  if (serverConfig.env === 'dev') {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    return res.error(500, 'Something went very wrong!');
  }
};

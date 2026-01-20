// Middleware xử lý exception (error handler)
module.exports = (err, req, res, next) => {
  res.error(500, err.message, err);
};

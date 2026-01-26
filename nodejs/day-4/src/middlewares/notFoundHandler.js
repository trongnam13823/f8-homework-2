// Middleware xử lý route không tồn tại (404)
module.exports = (req, res, next) => {
  res.error(404, 'Resource not found');
};

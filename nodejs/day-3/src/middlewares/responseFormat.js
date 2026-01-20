// Middleware chuẩn hóa response format
module.exports = (req, res, next) => {
  // Trả về response thành công
  res.success = (data, status = 200) => {
    return res.status(status).json({
      status: 'success',
      data
    });
  };

  // Trả về response lỗi
  res.error = (status, message, error = null) => {
    const response = {
      status: 'error',
      message
    };

    if (error !== null) {
      response.error = error;
    }

    return res.status(status).json(response);
  };

  next();
};

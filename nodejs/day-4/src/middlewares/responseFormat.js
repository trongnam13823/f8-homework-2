// Middleware chuẩn hóa response format
module.exports = (req, res, next) => {
  // Trả về response thành công
  res.success = (data, status = 200) => {
    return res.status(status).json({
      status: 'success',
      data
    });
  };

  res.pagination = (data, status = 200) => {
    return res.status(status).json({
      status: 'success',
      data: data.rows,
      pagination: {
        total: data.total,
        per_page: data.per_page,
        from: data.from,
        to: data.to,
        current_page: data.current_page
      }
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

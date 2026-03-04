const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.error(message, statusCode, err.errors || null);
};

module.exports = errorHandler;

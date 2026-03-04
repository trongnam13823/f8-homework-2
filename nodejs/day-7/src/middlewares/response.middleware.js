const responseHandler = (req, res, next) => {
    res.success = (data = null, message = 'Success', statusCode = 200) => {
        return res.status(statusCode).json({
            status: 'success',
            message,
            data,
        });
    };

    res.error = (message = 'Error', statusCode = 500, errors = null) => {
        return res.status(statusCode).json({
            status: 'error',
            message,
            errors,
        });
    };

    next();
};

module.exports = responseHandler;

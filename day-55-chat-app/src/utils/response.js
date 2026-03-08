module.exports = {
    success: (res, data = {}, message = 'Success', statusCode = 200) => {
        return res.status(statusCode).json({
            success: true,
            data,
            message,
        });
    },
    error: (res, message = 'Error', statusCode = 500, errors = null) => {
        const response = {
            success: false,
            message,
        };
        if (errors) {
            response.errors = errors;
        }
        return res.status(statusCode).json(response);
    },
};

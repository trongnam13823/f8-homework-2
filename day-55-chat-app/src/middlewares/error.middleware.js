const response = require('@/utils/response');

const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log for debugging

    if (err.name === 'ZodError') {
        return response.error(res, 'Validation Error', 400, err.errors);
    }

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return response.error(res, 'Invalid or expired token', 401);
    }

    // Prisma unique constraint violation error code
    if (err.code === 'P2002') {
        return response.error(res, 'Unique constraint failed, record already exists', 409);
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return response.error(res, message, statusCode);
};

module.exports = errorMiddleware;

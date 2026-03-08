const { verifyToken } = require('@/utils/jwt');
const response = require('@/utils/response');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return response.error(res, 'Authorization token missing or invalid', 401);
        }

        const token = authHeader.split(' ')[1];

        const decoded = verifyToken(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authMiddleware;

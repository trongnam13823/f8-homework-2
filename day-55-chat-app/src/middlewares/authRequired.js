const response = require('@/utils/response');
const { verifyAccessToken } = require('@/utils/jwt');

const authRequired = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return response.error(res, 'Authorization token missing or invalid', 401);
        }

        const token = authHeader.split(' ')[1];

        const decoded = verifyAccessToken(token);
        req.user = decoded;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authRequired;

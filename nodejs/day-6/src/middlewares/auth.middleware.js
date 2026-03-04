const jwt = require('jsonwebtoken');
const RevokedTokenModel = require('@/models/revokedToken.model');
const ApiError = require('@/utils/ApiError');

const authRequired = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError('Authentication token is required', 401);
        }

        const token = authHeader.split(' ')[1];

        // Check if blacklisted
        const isRevoked = await RevokedTokenModel.isRevoked(token);
        if (isRevoked) {
            throw new ApiError('Token has been revoked', 401);
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.sub };

        next();
    } catch (err) {
        if (err instanceof ApiError) {
            return next(err);
        }
        return next(new ApiError('Invalid or expired token', 401));
    }
};

module.exports = authRequired;

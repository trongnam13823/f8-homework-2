const jwtService = require('../services/jwt.service');
const ApiError = require('../utils/ApiError');

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new ApiError(401, 'Missing access token');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwtService.verifyAccessToken(token);

    req.user = decoded;
    next();
}

module.exports = { authenticate };

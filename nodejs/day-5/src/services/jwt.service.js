const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt.config');
const ApiError = require('../utils/ApiError');

const generateAccessToken = (payload) => {
    return jwt.sign(payload, jwtConfig.accessSecret, { expiresIn: '24h' });
};

const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, jwtConfig.accessSecret);
    } catch (error) {
        throw new ApiError(401, 'Invalid access token');
    }
};

module.exports = {
    generateAccessToken,
    verifyAccessToken
};

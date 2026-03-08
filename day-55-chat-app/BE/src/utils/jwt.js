const jwtConfig = require('@/config/jwt.config');
const jwt = require('jsonwebtoken');

const signAccessToken = (userId) => {
    const { secret, expiresIn } = jwtConfig.accessToken;
    return jwt.sign({ sub: userId }, secret, { expiresIn });
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, jwtConfig.accessToken.secret);
};

module.exports = {
    signAccessToken,
    verifyAccessToken,
};


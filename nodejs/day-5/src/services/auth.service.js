const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwtService = require('./jwt.service');
const ApiError = require('../utils/ApiError');

const authService = {
    register: async (email, password) => {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            throw new ApiError(400, 'Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await User.create(email, hashedPassword);

        const user = await User.findById(userId);
        const accessToken = jwtService.generateAccessToken({ userId: user.id });

        return { user, accessToken };
    },

    login: async (email, password) => {
        const user = await User.findByEmail(email);
        if (!user) {
            throw new ApiError(401, 'Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError(401, 'Invalid email or password');
        }

        const accessToken = jwtService.generateAccessToken({ userId: user.id });
        const { password: _password, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, accessToken };
    }
};

module.exports = authService;

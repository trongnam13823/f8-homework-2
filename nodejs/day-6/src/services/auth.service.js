const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('@/models/user.model');
const RefreshTokenModel = require('@/models/refreshToken.model');
const RevokedTokenModel = require('@/models/revokedToken.model');
const ApiError = require('@/utils/ApiError');

class AuthService {
    static generateAccessToken(userId) {
        return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY,
        });
    }

    static generateRefreshToken(userId) {
        return jwt.sign({ sub: userId }, process.env.REFRESH_SECRET, {
            expiresIn: process.env.REFRESH_EXPIRY,
        });
    }

    static async register(email, password) {
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            throw new ApiError('Email already registered', 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create(email, hashedPassword);

        const accessToken = this.generateAccessToken(user.id);
        const refreshToken = this.generateRefreshToken(user.id);

        // Store refresh token in DB
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days
        await RefreshTokenModel.create(user.id, refreshToken, expiresAt);

        return { user, accessToken, refreshToken };
    }

    static async login(email, password) {
        const user = await UserModel.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new ApiError('Invalid email or password', 401);
        }

        const accessToken = this.generateAccessToken(user.id);
        const refreshToken = this.generateRefreshToken(user.id);

        // Replace or add refresh token (simple approach: delete old ones for this user or just add new one)
        // Here we'll just add it. In a production app, you might want to limit the number of active sessions.
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await RefreshTokenModel.create(user.id, refreshToken, expiresAt);

        return { user, accessToken, refreshToken };
    }

    static async refreshToken(oldRefreshToken) {
        try {
            const decoded = jwt.verify(oldRefreshToken, process.env.REFRESH_SECRET);
            const storedToken = await RefreshTokenModel.findByToken(oldRefreshToken);

            if (!storedToken) {
                throw new ApiError('Invalid refresh token', 401);
            }

            // Delete old refresh token (one-time use)
            await RefreshTokenModel.deleteByToken(oldRefreshToken);

            const userId = decoded.sub;
            const newAccessToken = this.generateAccessToken(userId);
            const newRefreshToken = this.generateRefreshToken(userId);

            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);
            await RefreshTokenModel.create(userId, newRefreshToken, expiresAt);

            return { accessToken: newAccessToken, refreshToken: newRefreshToken };
        } catch (err) {
            throw new ApiError('Invalid or expired refresh token', 401);
        }
    }

    static async logout(accessToken, refreshToken) {
        // Blacklist access token
        await RevokedTokenModel.create(accessToken);

        // Delete refresh token if provided
        if (refreshToken) {
            await RefreshTokenModel.deleteByToken(refreshToken);
        }
    }
}

module.exports = AuthService;

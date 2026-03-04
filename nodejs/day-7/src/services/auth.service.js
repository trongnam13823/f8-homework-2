const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('@/models/user.model');
const RefreshTokenModel = require('@/models/refreshToken.model');
const RevokedTokenModel = require('@/models/revokedToken.model');
const JobModel = require('@/models/job.model');
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

    static generateVerificationToken(userId) {
        return jwt.sign({ sub: userId }, process.env.JWT_VERIFY_SECRET, {
            expiresIn: process.env.JWT_VERIFY_EXPIRY || '2h',
        });
    }

    static async register(email, password) {
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            throw new ApiError('Email already registered', 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create(email, hashedPassword);

        // Generate verification token
        const verificationToken = this.generateVerificationToken(user.id);
        const verificationLink = `${process.env.FRONTEND_URL}?token=${verificationToken}`;

        // Push to queue instead of sending directly
        await JobModel.create('sendVerificationEmail', {
            email,
            verificationLink
        });

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
        await RevokedTokenModel.create(accessToken);
        if (refreshToken) {
            await RefreshTokenModel.deleteByToken(refreshToken);
        }
    }

    static async verifyEmail(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_VERIFY_SECRET);
            const userId = decoded.sub;

            const user = await UserModel.findById(userId);
            if (!user) {
                throw new ApiError('User not found', 404);
            }

            if (user.verified_at) {
                throw new ApiError('Account already verified', 400);
            }

            await UserModel.updateVerifiedAt(userId);
            return { message: 'Email verified successfully' };
        } catch (err) {
            if (err instanceof ApiError) throw err;
            if (err.name === 'TokenExpiredError') {
                throw new ApiError('Verification token expired', 400);
            }
            throw new ApiError('Invalid verification token', 400);
        }
    }
}

module.exports = AuthService;

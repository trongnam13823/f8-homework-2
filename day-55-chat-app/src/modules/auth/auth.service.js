const prisma = require('@/lib/prisma');
const { hashPassword, comparePassword } = require('@/utils/password');
const jwtConfig = require('@/config/jwt.config');
const jwt = require('jsonwebtoken');
const ApiError = require('@/utils/ApiError');

const signAccessToken = (userId) => {
    const { secret, expiresIn } = jwtConfig.accessToken;
    return jwt.sign({ sub: userId }, secret, { expiresIn });
};

const register = async ({ email, name, password }) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new ApiError(409, 'User with this email already exists');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
        },
    });

    const accessToken = signAccessToken(newUser.id);

    return {
        user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
        },
        accessToken,
    };
};

const login = async (credentials) => {
    const { email, password } = credentials;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new ApiError(401, 'Invalid email or password');
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid email or password');
    }

    const accessToken = signAccessToken(user.id);

    return {
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        },
        accessToken,
    };
};

module.exports = {
    register,
    login,
};

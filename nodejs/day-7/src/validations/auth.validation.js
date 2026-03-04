const { z } = require('zod');
const { email, password } = require('./common.validation');

const register = z.object({
    body: z.object({
        email,
        password,
    }),
});

const login = register;

const refresh = z.object({
    body: z.object({
        refresh_token: z.string(),
    }),
});

const verifyEmail = z.object({
    body: z.object({
        token: z.string(),
    }),
});

module.exports = {
    register,
    login,
    refresh,
    verifyEmail,
};

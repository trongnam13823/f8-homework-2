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

const changePassword = z.object({
    body: z.object({
        oldPassword: z.string().min(1, 'Old password is required'),
        newPassword: z.string().min(6, 'New password must be at least 6 characters'),
        confirmPassword: z.string().min(1, 'Confirm password is required'),
    }).refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Confirm password must match new password',
        path: ['confirmPassword'],
    }),
});

module.exports = {
    register,
    login,
    refresh,
    verifyEmail,
    changePassword,
};

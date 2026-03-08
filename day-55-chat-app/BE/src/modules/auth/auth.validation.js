const { z } = require('zod');

const name = z.string().min(2);
const email = z.email();
const password = z.string().min(6);

const registerSchema = z.object({
    body: z.object({
        email,
        name,
        password,
    }),
});

const loginSchema = z.object({
    body: z.object({
        email,
        password,
    }),
});

module.exports = {
    registerSchema,
    loginSchema,
};

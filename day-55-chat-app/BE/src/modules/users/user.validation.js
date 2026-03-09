const { z } = require('zod');

const searchUserSchema = z.object({
    query: z.object({
        email: z.string().min(1),
    }),
});

module.exports = {
    searchUserSchema,
};

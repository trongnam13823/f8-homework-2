const { z } = require('zod');

// Common reusable schemas
const email = z.email();
const password = z.string().min(6);
const idParam = z.object({
    id: z.string().regex(/^\d+$/, "ID phải là số"),
});

module.exports = {
    email,
    password,
    idParam,
};

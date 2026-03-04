const { ZodError } = require('zod');
const ApiError = require('@/utils/ApiError');

const validate = (schema) => (req, res, next) => {
    try {
        const validatedData = schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        // Update request with validated data
        req.body = validatedData.body;
        req.query = validatedData.query;
        req.params = validatedData.params;

        next();
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.issues.map((err) => ({
                field: err.path.slice(1).join('.'),
                message: err.message,
            }));
            return next(new ApiError('Validation Error', 400, errorMessages));
        }
        next(error);
    }
};

module.exports = validate;

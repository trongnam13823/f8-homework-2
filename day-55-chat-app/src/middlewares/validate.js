const validate = (schema) => async (req, res, next) => {
    try {
        req.validated = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        return next();
    } catch (error) {
        error.errors = error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
        }));
        return next(error);
    }
};

module.exports = validate;

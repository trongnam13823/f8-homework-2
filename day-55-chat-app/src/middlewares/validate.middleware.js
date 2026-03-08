const validate = (schema) => async (req, res, next) => {
    try {
        const validatedData = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });

        req.body = validatedData.body;
        req.query = validatedData.query;
        req.params = validatedData.params;

        return next();
    } catch (error) {
        return next(error);
    }
};

module.exports = validate;

const authService = require('../services/auth.service');

const authController = {
    register: async (req, res) => {
        const { email, password } = req.body;

        const result = await authService.register(email, password);

        return res.success(result, 201);
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        const result = await authService.login(email, password);

        return res.success(result);
    }
};

module.exports = authController;

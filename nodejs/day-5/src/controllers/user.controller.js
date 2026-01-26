const userService = require('../services/user.service');

const userController = {
    search: async (req, res) => {
        const { q } = req.query;
        const users = await userService.searchUsers(q);
        return res.success(users);
    }
};

module.exports = userController;

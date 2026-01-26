const User = require('../models/user.model');

const userService = {
    searchUsers: async (email) => {
        return await User.searchByEmail(email);
    }
};

module.exports = userService;

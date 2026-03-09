const userService = require('./user.service');
const response = require('@/utils/response');
const catchAsync = require('@/utils/catchAsync');

const searchUser = catchAsync(async (req, res) => {
    const { email } = req.validated.query;
    const user = await userService.searchUserByEmail(email);
    return response.success(res, user, 'User found successfully');
});

module.exports = {
    searchUser,
};

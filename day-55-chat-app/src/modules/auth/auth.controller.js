const authService = require('./auth.service');
const response = require('@/utils/response');
const catchAsync = require('@/utils/catchAsync');

const register = catchAsync(async (req, res) => {
    const result = await authService.register(req.validated.body);
    return response.success(res, result, 'User registered successfully', 201);
});

const login = catchAsync(async (req, res) => {
    const result = await authService.login(req.validated.body);
    return response.success(res, result, 'Login successful', 200);
});

module.exports = {
    register,
    login,
};

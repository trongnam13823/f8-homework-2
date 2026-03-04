const AuthService = require('@/services/auth.service');

class AuthController {
    static async register(req, res) {
        const { email, password } = req.body;
        const result = await AuthService.register(email, password);
        return res.success(result, 'User registered successfully', 201);
    }

    static async login(req, res) {
        const { email, password } = req.body;
        const result = await AuthService.login(email, password);
        return res.success(result, 'Login successful');
    }

    static async refresh(req, res) {
        const { refresh_token } = req.body;
        const result = await AuthService.refreshToken(refresh_token);
        return res.success(result, 'Token refreshed successfully');
    }

    static async logout(req, res) {
        const authHeader = req.headers.authorization;
        const { refresh_token } = req.body;

        const accessToken = authHeader.split(' ')[1];
        await AuthService.logout(accessToken, refresh_token);

        return res.success(null, 'Logged out successfully');
    }

    static async verifyEmail(req, res) {
        const { token } = req.body;
        const result = await AuthService.verifyEmail(token);
        return res.success(result, 'Email verified successfully');
    }

    static async changePassword(req, res) {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        const result = await AuthService.changePassword(userId, { oldPassword, newPassword });
        return res.success(result, 'Password changed successfully');
    }
}

module.exports = AuthController;

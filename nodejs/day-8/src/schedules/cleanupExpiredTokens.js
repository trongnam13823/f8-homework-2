const RevokedTokenModel = require('@/models/revokedToken.model');

/**
 * Xóa các access token đã hết hạn khỏi blacklist (revoked_tokens)
 */
async function cleanupExpiredTokens() {
    try {
        console.log('[Schedule] Starting cleanup of expired revoked tokens...');

        const result = await RevokedTokenModel.deleteExpired();

        console.log(`[Schedule] Cleanup completed. Removed ${result.affectedRows} expired tokens.`);
    } catch (error) {
        console.error('[Schedule] Cleanup expired tokens failed:', error);
        throw error;
    }
}

module.exports = cleanupExpiredTokens;

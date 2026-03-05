const db = require('@/config/db.config');

class RevokedTokenModel {
    static async create(token, expiresAt) {
        await db.query('INSERT INTO revoked_tokens (token, expires_at) VALUES (?, ?)', [token, expiresAt]);
    }

    static async isRevoked(token) {
        const [rows] = await db.query('SELECT * FROM revoked_tokens WHERE token = ?', [token]);
        return rows.length > 0;
    }

    static async deleteExpired() {
        const [result] = await db.query('DELETE FROM revoked_tokens WHERE expires_at < NOW()');
        return result;
    }
}

module.exports = RevokedTokenModel;

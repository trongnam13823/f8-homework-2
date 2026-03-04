const db = require('@/config/db');

class RevokedTokenModel {
    static async create(token) {
        await db.query('INSERT INTO revoked_tokens (token) VALUES (?)', [token]);
    }

    static async isRevoked(token) {
        const [rows] = await db.query('SELECT * FROM revoked_tokens WHERE token = ?', [token]);
        return rows.length > 0;
    }
}

module.exports = RevokedTokenModel;

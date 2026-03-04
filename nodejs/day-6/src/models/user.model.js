const db = require('@/config/db');

class UserModel {
    static async create(email, hashedPassword) {
        const [result] = await db.query(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword]
        );
        return { id: result.insertId, email };
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = UserModel;

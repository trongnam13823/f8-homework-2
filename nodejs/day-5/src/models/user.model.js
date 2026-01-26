const db = require('../db');

const User = {
    create: async (email, password) => {
        const [result] = await db.query(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, password]
        );
        return result.insertId;
    },

    findByEmail: async (email) => {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    },

    findById: async (id) => {
        const [rows] = await db.query(
            'SELECT id, email, created_at FROM users WHERE id = ?',
            [id]
        );
        return rows[0];
    },

    searchByEmail: async (email) => {
        const [rows] = await db.query(
            'SELECT id, email FROM users WHERE email LIKE ?',
            [`%${email}%`]
        );
        return rows;
    }
};

module.exports = User;

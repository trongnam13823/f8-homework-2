const db = require('../db');

const Conversation = {
    create: async ({ name, type, created_by }) => {
        const [result] = await db.query(
            'INSERT INTO conversations (name, type, created_by) VALUES (?, ?, ?)',
            [name, type, created_by]
        );
        return result.insertId;
    },

    getUserConversations: async (user_id) => {
        const [rows] = await db.query(
            `SELECT c.* FROM conversations c
             JOIN conversation_participants cp ON c.id = cp.conversation_id
             WHERE cp.user_id = ?
             ORDER BY c.created_at DESC`,
            [user_id]
        );
        return rows;
    },

    findById: async (id) => {
        const [rows] = await db.query(
            'SELECT * FROM conversations WHERE id = ?',
            [id]
        );
        return rows[0];
    },

    addParticipant: async (conversation_id, user_id) => {
        const [result] = await db.query(
            'INSERT INTO conversation_participants (conversation_id, user_id) VALUES (?, ?)',
            [conversation_id, user_id]
        );
        return result.affectedRows;
    },

    getParticipants: async (conversation_id) => {
        const [rows] = await db.query(
            `SELECT u.id, u.email FROM users u
             JOIN conversation_participants cp ON u.id = cp.user_id
             WHERE cp.conversation_id = ?`,
            [conversation_id]
        );
        return rows;
    }
};

module.exports = Conversation;

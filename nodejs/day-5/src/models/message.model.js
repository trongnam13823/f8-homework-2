const db = require('../db');

const Message = {
    create: async ({ conversation_id, sender_id, content }) => {
        const [result] = await db.query(
            'INSERT INTO messages (conversation_id, sender_id, content) VALUES (?, ?, ?)',
            [conversation_id, sender_id, content]
        );
        return result.insertId;
    },

    getConversationMessages: async (conversation_id) => {
        const [rows] = await db.query(
            `SELECT m.*, u.email as sender_email FROM messages m
             JOIN users u ON m.sender_id = u.id
             WHERE m.conversation_id = ?
             ORDER BY m.created_at ASC`,
            [conversation_id]
        );
        return rows;
    }
};

module.exports = Message;

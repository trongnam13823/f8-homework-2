const db = require('../db');

const Post = {
    getAllPosts: async ({ user_id, page = 1, limit = 20 }) => {
        const current_page = Math.max(1, parseInt(page) || 1);
        const per_page = Math.min(parseInt(limit), 500)
        const offset = (current_page - 1) * per_page

        const [[rows], [totalResult]] = await Promise.all([
            db.query(
                'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
                [user_id, per_page, offset]
            ),
            db.query(
                'SELECT COUNT(*) as total FROM posts WHERE user_id = ?',
                [user_id]
            )
        ]);

        const from = rows.length > 0 ? offset + 1 : 0;
        const to = offset + rows.length;

        const total = totalResult[0].total;

        return { rows, total, per_page, from, to, current_page };
    }
};

module.exports = Post;

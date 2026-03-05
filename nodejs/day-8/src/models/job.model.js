const db = require('@/config/db.config');

class JobModel {
    static async create(taskName, payload) {
        const [result] = await db.query(
            'INSERT INTO jobs (task_name, payload) VALUES (?, ?)',
            [taskName, JSON.stringify(payload)]
        );
        return result.insertId;
    }

    /**
     * Lấy job tiếp theo và đánh dấu status là processing ngay lập tức (Atomic)
     */
    static async getNextJob() {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Tìm job pending và lock nó lại
            // FOR UPDATE SKIP LOCKED giúp nhiều worker chạy song song mượt mà hơn (MySQL 8.0+)
            const [rows] = await connection.query(
                "SELECT * FROM jobs WHERE status = 'pending' ORDER BY created_at ASC LIMIT 1 FOR UPDATE SKIP LOCKED"
            );

            if (rows.length === 0) {
                await connection.commit();
                return null;
            }

            const job = rows[0];

            // Cập nhật status sang processing ngay lập tức
            await connection.query(
                "UPDATE jobs SET status = 'processing', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                [job.id]
            );

            await connection.commit();
            return job;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async complete(id) {
        await db.query(
            "UPDATE jobs SET status = 'completed', updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            [id]
        );
    }

    static async fail(id, errorMessage) {
        await db.query(
            "UPDATE jobs SET status = 'failed', last_error = ?, attempts = attempts + 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            [errorMessage, id]
        );
    }
}

module.exports = JobModel;

const db = require('@/config/db.config');

class TodoModel {
    static async getAll() {
        const [rows] = await db.query('SELECT * FROM todos ORDER BY created_at DESC');
        return rows;
    }

    static async getById(id) {
        const [rows] = await db.query('SELECT * FROM todos WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(data) {
        const { title, completed = false } = data;
        const [result] = await db.query(
            'INSERT INTO todos (title, completed) VALUES (?, ?)',
            [title, completed]
        );
        return { id: result.insertId, ...data };
    }

    static async update(id, data) {
        const { title, completed } = data;

        // Get existing to merge or just update provided fields
        const todo = await this.getById(id);
        if (!todo) return null;

        const updatedTitle = title !== undefined ? title : todo.title;
        const updatedCompleted = completed !== undefined ? completed : todo.completed;

        await db.query(
            'UPDATE todos SET title = ?, completed = ? WHERE id = ?',
            [updatedTitle, updatedCompleted, id]
        );

        return { id, title: updatedTitle, completed: updatedCompleted };
    }

    static async delete(id) {
        const todo = await this.getById(id);
        if (!todo) return null;

        await db.query('DELETE FROM todos WHERE id = ?', [id]);
        return todo;
    }
}

module.exports = TodoModel;

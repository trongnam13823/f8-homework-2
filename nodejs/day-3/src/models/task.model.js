const pool = require('../config/database');

// Lấy tất cả tasks
async function findAll() {
  const [rows] = await pool.execute(
    'SELECT * FROM tasks ORDER BY created_at DESC'
  );
  return rows;
}

// Tìm task theo id
async function findOne(id) {
  const [rows] = await pool.execute(
    'SELECT * FROM tasks WHERE id = ?',
    [id]
  );
  return rows.length > 0 ? rows[0] : null;
}

// Tạo task mới
async function create(taskData) {
  const { title, completed = false } = taskData;
  const [result] = await pool.execute(
    'INSERT INTO tasks (title, completed) VALUES (?, ?)',
    [title, completed]
  );

  const newTask = await findOne(result.insertId);
  return newTask;
}

// Cập nhật task theo id
async function update(id, taskData) {
  const updateFields = [];
  const values = [];

  if (taskData.title !== undefined) {
    updateFields.push('title = ?');
    values.push(taskData.title);
  }

  if (taskData.completed !== undefined) {
    updateFields.push('completed = ?');
    values.push(taskData.completed);
  }

  if (updateFields.length === 0) {
    return 0;
  }

  updateFields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);

  const [result] = await pool.execute(
    `UPDATE tasks SET ${updateFields.join(', ')} WHERE id = ?`,
    values
  );

  return result.affectedRows;
}

// Xóa task theo id
async function destroy(id) {
  const [result] = await pool.execute(
    'DELETE FROM tasks WHERE id = ?',
    [id]
  );
  return result.affectedRows;
}

module.exports = {
  findAll,
  findOne,
  create,
  update,
  destroy
};

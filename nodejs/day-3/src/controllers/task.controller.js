const taskModel = require('../models/task.model');

// GET /api/tasks
async function getAllTasks(req, res, next) {
  const tasks = await taskModel.findAll();
  res.success(tasks);
}

// GET /api/tasks/:id
async function getTaskById(req, res, next) {
  const { id } = req.params;
  const task = await taskModel.findOne(parseInt(id));

  if (!task) {
    return res.error(404, 'Task not found');
  }

  res.success(task);
}

// POST /api/tasks
async function createTask(req, res, next) {
  const { title, completed } = req.body;

  const task = await taskModel.create({
    title,
    completed: completed || false
  });

  res.success(task, 201);
}

// PUT /api/tasks/:id
async function updateTask(req, res, next) {
  const { id } = req.params;
  const { updateData } = req.body;

  const existingTask = await taskModel.findOne(parseInt(id));
  if (!existingTask) {
    return res.error(404, 'Task not found');
  }

  const affectedRows = await taskModel.update(parseInt(id), updateData);

  if (affectedRows === 0) {
    return res.error(500, 'Failed to update task');
  }

  const updatedTask = await taskModel.findOne(parseInt(id));
  res.success(updatedTask);
}

// DELETE /api/tasks/:id
async function deleteTask(req, res, next) {
  const { id } = req.params;

  const existingTask = await taskModel.findOne(parseInt(id));
  if (!existingTask) {
    return res.error(404, 'Task not found');
  }

  const affectedRows = await taskModel.destroy(parseInt(id));

  if (affectedRows === 0) {
    return res.error(500, 'Failed to delete task');
  }

  res.success({ message: 'Task deleted successfully' });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};

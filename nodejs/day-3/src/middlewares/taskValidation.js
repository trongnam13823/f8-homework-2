// Validate create task
function validateCreateTask(req, res, next) {
  const { title } = req.body;

  if (!title || title.trim() === '') {
    return res.error(400, 'Title is required');
  }

  // Trim title và gán lại vào req.body
  req.body.title = title.trim();
  next();
}

// Validate update task
function validateUpdateTask(req, res, next) {
  const { title, completed } = req.body;

  const updateData = {};
  if (title !== undefined) {
    if (title.trim() === '') {
      return res.error(400, 'Title cannot be empty');
    }
    updateData.title = title.trim();
  }
  if (completed !== undefined) {
    updateData.completed = completed;
  }

  if (Object.keys(updateData).length === 0) {
    return res.error(400, 'No fields to update');
  }

  // Gán updateData vào req.body để controller sử dụng
  req.body.updateData = updateData;
  next();
}

module.exports = {
  validateCreateTask,
  validateUpdateTask
};

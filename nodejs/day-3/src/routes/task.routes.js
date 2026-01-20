const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/task.controller');
const { validateCreateTask, validateUpdateTask } = require('../middlewares/taskValidation');

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', validateCreateTask, createTask);
router.put('/:id', validateUpdateTask, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;

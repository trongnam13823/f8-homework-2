const express = require('express');
const TodoController = require('@/controllers/todo.controller');
const catchAsync = require('@/middlewares/catchAsync');
const authRequired = require('@/middlewares/auth.middleware');
const validate = require('@/middlewares/validate.middleware');
const todoValidation = require('@/validations/todo.validation');

const router = express.Router();

router.get('/', catchAsync(TodoController.getAllTodos));
router.get('/:id', validate(todoValidation.getTodoById), catchAsync(TodoController.getTodoById));

// Protected CUD routes
router.post('/', authRequired, validate(todoValidation.createTodo), catchAsync(TodoController.createTodo));
router.put('/:id', authRequired, validate(todoValidation.updateTodo), catchAsync(TodoController.updateTodo));
router.delete('/:id', authRequired, validate(todoValidation.deleteTodo), catchAsync(TodoController.deleteTodo));

module.exports = router;


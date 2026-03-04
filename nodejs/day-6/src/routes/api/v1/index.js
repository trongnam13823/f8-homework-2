const express = require('express');
const authRoutes = require('./auth.routes');
const todoRoutes = require('./todo.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/todos', todoRoutes);

module.exports = router;

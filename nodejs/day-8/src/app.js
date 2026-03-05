const express = require('express');
const routes = require('@/routes');
const responseHandler = require('@/middlewares/response.middleware');
const errorHandler = require('@/middlewares/error.middleware');
const ApiError = require('@/utils/ApiError');

const app = express();

// Custom response handler middleware (res.success, res.error)
app.use(responseHandler);

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/', routes);

// Root route
app.get('/', (req, res) => {
    res.success({ version: '1.0.0' }, 'Welcome to Todo API');
});

// 404 handler for routes not found
app.use((req, res, next) => {
    next(new ApiError('Route not found', 404));
});

// Centralized Error Handler (Must be after all routes)
app.use(errorHandler);

module.exports = app;

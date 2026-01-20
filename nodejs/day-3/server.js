const express = require('express');
const app = express();

const responseFormat = require('./src/middlewares/responseFormat');
const notFoundHandler = require('./src/middlewares/notFoundHandler');
const exceptionHandler = require('./src/middlewares/exceptionHandler');
const { apiRateLimiter } = require('./src/middlewares/rateLimiter');

app.use(responseFormat);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiRateLimiter);

// Test routes
app.get('/test-success', (req, res) => {
  res.success({ message: 'Hello World' });
});

app.get('/test-error', (req, res) => {
  throw new Error('Test exception');
});

const taskRoutes = require('./src/routes/task.routes');
app.use('/api/tasks', taskRoutes);

app.use(notFoundHandler);
app.use(exceptionHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('@/routes/index');
const errorMiddleware = require('@/middlewares/error.middleware');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// HTTP request logger based on morgan
app.use(morgan('dev'));

// Routing
app.use('/api', routes);

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;

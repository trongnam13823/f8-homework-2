require('dotenv').config();
const express = require('express');
const responseFormat = require('./middlewares/responseFormat');
const exceptionHandler = require('./middlewares/exceptionHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');
const serverConfig = require('./configs/server.config');

const app = express();

app.use(express.json());
app.use(responseFormat);

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/conversations', require('./routes/conversations.route'));
app.use('/api/users', require('./routes/users.route'));

app.use(notFoundHandler);
app.use(exceptionHandler);

app.listen(serverConfig.port, () => {
    console.log(`Server is running on port ${serverConfig.port}`);
});

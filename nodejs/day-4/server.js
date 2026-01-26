require('dotenv').config();
const express = require('express');
const responseFormat = require('./src/middlewares/responseFormat');
const exceptionHandler = require('./src/middlewares/exceptionHandler');
const notFoundHandler = require('./src/middlewares/notFoundHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(responseFormat);

app.use('/posts', require('./src/routes/postRoutes'));

app.use(notFoundHandler);
app.use(exceptionHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

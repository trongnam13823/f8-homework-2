require('dotenv').config();
const express = require('express');
const responseFormat = require('./middlewares/responseFormat');
const exceptionHandler = require('./middlewares/exceptionHandler');
const notFoundHandler = require('./middlewares/notFoundHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(responseFormat);

app.use('/posts', require('./routes/postRoutes'));

app.use(notFoundHandler);
app.use(exceptionHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

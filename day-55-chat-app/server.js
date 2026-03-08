require('module-alias/register');
require('dotenv').config();
const app = require('@/app');
const serverConfig = require('@/config/server.config');

const PORT = serverConfig.port;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

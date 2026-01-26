const mysql = require('mysql2/promise');
const databaseConfig = require('../src/configs/db.config');

const pool = mysql.createPool({
    host: databaseConfig.host,
    user: databaseConfig.user,
    password: databaseConfig.password,
    database: databaseConfig.database,
    port: databaseConfig.port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;

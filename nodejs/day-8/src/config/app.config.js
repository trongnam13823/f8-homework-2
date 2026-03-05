const appConfig = {
    adminEmail: process.env.ADMIN_EMAIL,
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    mysqlContainerName: 'mysql8_day8',
};

module.exports = appConfig;

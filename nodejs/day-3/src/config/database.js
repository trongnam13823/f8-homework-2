const mysql = require('mysql2/promise');

// Cấu hình kết nối MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_dev',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;

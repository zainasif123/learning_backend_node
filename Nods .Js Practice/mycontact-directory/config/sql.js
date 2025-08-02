// db.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,
});

module.exports = pool.promise();

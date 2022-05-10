const mysql = require('mysql');

const {
  DB_HOST, DB_USER, DB_PASSWORD, DB_NAME,
} = process.env;

const conn = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

module.exports = conn;

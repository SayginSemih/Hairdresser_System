const mysql = require("mysql2");
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
});

// ... later
pool.query('select 1 + 1', (err, rows) => { /* */ });

module.exports = pool;
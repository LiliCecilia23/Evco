var express = require('express'); // Web Framework
var app = express();
var sql = require('mssql'); // MS Sql Server client

var config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: 'evco.database.windows.net',
  database: 'EvcoDB'
}

// Create a pool of database connections
const pool = new sql.ConnectionPool(config);

// Connect to the database
pool.connect()
  .then(() => console.log('Connected to SQL Server'))
  .catch((err) => console.error('Database connection error:', err));

module.exports = pool;
var express = require('express'); // Web Framework
var app = express();
var sql = require('mssql'); // MS Sql Server client

// Create a pool of database connections
const pool = new sql.ConnectionPool(process.env('DATABASE_CONNECTION_STRING'));

// Connect to the database
pool.connect()
  .then(() => console.log('Connected to SQL Server'))
  .catch((err) => console.error('Database connection error:', err));

module.exports = pool;
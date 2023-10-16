var express = require('express'); // Web Framework
var app = express();
var sql = require('mssql'); // MS Sql Server client

// Connection string parameters.
var config = {
    user: 'CloudSA8536b986',
    password: 'evco7989%',
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
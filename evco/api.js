const express = require('express');
const app = express();
const cors = require('cors');
var sql = require('mssql'); // MS Sql Server client
const port = process.env.PORT || 1433;
const pool = require('./server'); // Import the database connection pool

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Get ALL Data
app.get('/api/data', async (req, res) => {
  try {
    const request = new sql.Request(pool);
    const result = await request.query('SELECT * FROM evco');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Categories
app.get('/api/data/categories', async (req, res) => {
  try {
    const request = new sql.Request(pool);
    const result = await request.query('SELECT DISTINCT Category FROM evco');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Products by Category
app.get(`/api/data/products/${category}`, async (req, res) => {
  try {
    const request = new sql.Request(pool);
    const result = await request.query('SELECT DISTINCT Category FROM evco');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

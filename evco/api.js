const express = require('express');
const app = express();
const cors = require('cors');
var sql = require('mssql'); // MS Sql Server client
const port = process.env.PORT || 1433;
const pool = require('./server'); // Import the database connection pool

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Get All Categories
app.get('/api/data/categories', async (req, res) => {
  try {
    const request = new sql.Request(pool);
    const result = await request.query('SELECT * FROM categories');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Parent Categories
app.get('/api/data/categories/parents', async (req, res) => {
  try {
    const request = new sql.Request(pool);
    const result = await request.query('SELECT * FROM categories WHERE parentCategory = 1');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Subcategories by Category
app.get('/api/data/categories/:parent', async (req, res) => {
  const { parent } = req.params; // Retrieve the parent parameter from the URL
  try {
    const request = new sql.Request(pool);
    const query = `SELECT * FROM categories WHERE ParentId = @parent`; // Use a parameterized query to filter by parent
    request.input('parent', sql.NVarChar, parent);
    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get All Products
app.get(`/api/data/products`, async (req, res) => {
  try {
    const request = new sql.Request(pool);
    const result = await request.query('SELECT * FROM products');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Products by Category
app.get('/api/data/products/:category', async (req, res) => {
  const { category } = req.params; // Retrieve the category parameter from the URL
  try {
    const request = new sql.Request(pool);
    const query = `SELECT * FROM products WHERE Category_ID = @category`; // Use a parameterized query to filter by category
    request.input('category', sql.NVarChar, category);
    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Product by Part Number
app.get('/api/data/products/:partNum', async (req, res) => {
  const { partNum } = req.params; // Retrieve the category parameter from the URL
  try {
    const request = new sql.Request(pool);
    const query = `SELECT * FROM products WHERE Part_Number = @partNum`; // Use a parameterized query to filter by category
    request.input('category', sql.NVarChar, partNum);
    const result = await request.query(query);
    res.json(result.recordset);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

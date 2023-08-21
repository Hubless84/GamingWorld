
const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();

process.on('uncaughtException', function (err) {
  console.log(err);
});


// Middleware
app.use(cors());
app.use(bodyParser.json());


 //TestConnection 
 app.get('/api/TestConnection', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Connected to backend successfully!' });
});

// PostgreSQL database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'GamingWorld',
  password: 'postgres',
  port: 5432,
});

// Example API endpoint for user registration
app.post('/api/register', async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    // Hash the password before storing in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
    await pool.query(query, [name, username, email, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, Express server is running!');
});


// Start the server
const port = process.env.PORT || 5000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

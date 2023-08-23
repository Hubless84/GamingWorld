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

// PostgreSQL database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'GamingWorld',
  password: 'postgres',
  port: 5432,
});

app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Insert user into the RegisteredUser table
    const query = 'INSERT INTO RegisteredUser (person_uid, Username, Password, RegistrationDate) VALUES (uuid_generate_v4(), $1, $2, NOW())';
    await pool.query(query, [username, password]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


// Checking for user login credentials
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username and password match a registered user
    const query = 'SELECT * FROM RegisteredUser WHERE Username = $1 AND Password = $2';
    const result = await pool.query(query, [username, password]);

    if (result.rowCount === 1) {
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Incorrect username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});


// app.get('/', (req, res) => {
//   res.send('Hello, Express server is running!');
// });


 //TestConnection 
 app.get('/api/TestConnection', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Connected to backend successfully!' });
});


// Start the server
const port = process.env.PORT || 5000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

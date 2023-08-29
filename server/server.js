const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const fetch = require('node-fetch');

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
  database: 'gamingworld',
  password: 'postgres',
  port: 5432,
});


// // Riot API handling
const riotBaseURL = 'https://euw1.api.riotgames.com';
const riotApiKey = 'RGAPI-258569f6-dae6-4d97-b4ce-4b8e81d9cf6a';

  // LOL champion-rotation api

  app.get('/api/lol-champion-rotations', async (req, res) => {
    try {
      const apiURL = `${riotBaseURL}/lol/platform/v3/champion-rotations`;
      const response = await fetch(apiURL, {
        headers: {
          'X-Riot-Token': riotApiKey,
        },
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching data', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  // LOL Summoner-v4 API (LolMain)
  app.get('/api/lol/summoner', async (req, res) => {
    try {
        const { name } = req.query;
        const apiURL = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`;
        
        const response = await fetch(apiURL, {
            headers: {
                'X-Riot-Token': riotApiKey, // Replace with your Riot API key
            },
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data', error);
        res.status(500).json({ error: 'An error occurred' });
    }
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




// Start the server
const port = process.env.PORT || 5000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

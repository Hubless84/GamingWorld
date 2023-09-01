const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');


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
const riotApiKey = 'RGAPI-8088c485-d417-4abc-9e37-ce12c4a0ab99';

  // 
  app.get('/api/lol/leagues', async (req, res) => {
    const { queue } = req.query;
  
    if (!queue) {
      return res.status(400).json({ error: 'Queue parameter is required' });
    }
  
    try {
      const apiURL = `https://euw1.api.riotgames.com/lol/league/v4/entries/${queue}`;
  
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

    const person_uid = uuidv4(); // Generate a new UUID for the person

    // Insert user into the RegisteredUser table
    const registeredUserQuery = 'INSERT INTO RegisteredUser (person_uid, Username, Password, RegistrationDate) VALUES ($1, $2, $3, NOW())';
    await pool.query(registeredUserQuery, [person_uid, username, password]);

    // Insert user into the Person table
    const personQuery = 'INSERT INTO Person (person_uid, name, email, registration_status) VALUES ($1, $2, $3, $4)';
    await pool.query(personQuery, [person_uid, username, email, 'Registered']);

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
// Fetch leaderboard data
app.get('/api/leaderboard', async (req, res) => {
  try {
    const leaderboardData = await pool.query('SELECT * FROM leaderboard ORDER BY score DESC');
    res.json(leaderboardData.rows);
  } catch (error) {
    console.error('Error fetching leaderboard data', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Submit score for a game
app.post('/api/submit-score', async (req, res) => {
  const { registered_user_uid, game_name, score } = req.body;

  if (!registered_user_uid || !game_name || !score) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const query = `
      INSERT INTO IndividualScores (score_id, registered_user_uid, game_name, score, submission_date)
      VALUES (uuid_generate_v4(), $1, $2, $3, CURRENT_DATE)
      RETURNING *`;
      
    const values = [registered_user_uid, game_name, score];
    const result = await pool.query(query, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error submitting score', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Handle game-specific score submissions
app.post('/api/game/score', async (req, res) => {
  const { registered_user_uid, game_name, score } = req.body;

  if (!registered_user_uid || !game_name || !score) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    // Check if the provided registered_user_uid exists in the RegisteredUser table
    const userQuery = 'SELECT person_uid FROM RegisteredUser WHERE person_uid = $1';
    const userValues = [registered_user_uid];
    const userResult = await pool.query(userQuery, userValues);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Use the appropriate logic for each game
    let table_name;
    switch (game_name) {
      case 'fifa23':
        table_name = 'Fifa23Scores';
        break;
      case 'valorant':
        table_name = 'ValorantScores';
        break;
      case 'lol':
        table_name = 'LeagueOfLegendsScores';
        break;
      default:
        return res.status(400).json({ error: 'Invalid game name' });
    }

    const insertQuery = `INSERT INTO ${table_name} (registered_user_uid, score) VALUES ($1, $2)`;
    await pool.query(insertQuery, [registered_user_uid, score]);

    res.status(201).json({ message: 'Score submitted successfully' });
  } catch (error) {
    console.error('Error submitting score', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Adding a new endpoint to check if a user already exists
app.get('/api/check-user', async (req, res) => {
  const { username, email } = req.query;

  try {
    // Check if the username or email already exists in the database
    const query = 'SELECT EXISTS(SELECT 1 FROM RegisteredUser WHERE Username = $1 OR Email = $2)';
    const result = await pool.query(query, [username, email]);
    const exists = result.rows[0].exists;

    res.json({ exists });
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Checking for user contact credentials
app.post('/api/add-contact', async (req, res) => {
  const { first_name, last_name, phone_number, email } = req.body;

  try {
    if (!first_name || !last_name || !phone_number || !email) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }
    // Insert contact details into the database
    const query = 'INSERT INTO Contact (contact_uid, first_name, last_name, phone_number, email) VALUES (uuid_generate_v4(), $1, $2, $3, $4)';
    await pool.query(query, [first_name, last_name, phone_number, email]);

    res.status(201).json({ message: 'Contact added successfully' });
  } catch (error) {
    console.error('Error during contact insertion:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Start the server
const port = process.env.PORT || 5000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

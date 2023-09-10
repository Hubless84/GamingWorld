const cors = require('cors');
const axios = require('axios');
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


// Riot API handling
const riotApiKey = 'RGAPI-5202bb1e-b677-4c1b-af53-a11a11c7924d';

  //getting 
  function getPlayerPUUID(playerName){
    return axios.get("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + playerName + "?api_key=" + riotApiKey)
    .then(response => {
      console.log(response.data); 
      return response.data.puuid
    }).catch(err => err);
  }

  app.get("/5pastgames", async (req, res) => {
    try {
      const playerName = req.query.username;
  
      // PUUID
      const PUUID = await getPlayerPUUID(playerName);
      const apiCall = "https://americas.api.riotgames.com" + "/lol/match/v5/matches/by-puuid/" + PUUID + "/ids" + "?api_key=" + riotApiKey;
  
      // List of game ID strings
      const gameIDs = await axios.get(apiCall)
        .then(response => response.data)
        .catch(err => err);
  
      var matchDataArray = [];
      for (var i = 0; i < gameIDs.length - 15; i++) {
        const matchID = gameIDs[i];
        const matchData = await axios
          .get("https://americas.api.riotgames.com" + "/lol/match/v5/matches/" + matchID + "?api_key=" + riotApiKey)
          .then((response) => response.data)
          .catch((err) => err);
        matchDataArray.push(matchData);
      }
      // Save info as JSON, send to client side
      res.json(matchDataArray);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred." });
    }
  }); 
   

  // LOL Summoner-v4 API (LolMain)
  app.get('/api/lol/summoner', async (req, res) => {
    try {
        const { name } = req.query;
        const apiURL = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`;
        
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


app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const person_uid = uuidv4(); // Generate a new UUID for the person

    // Insert user into the RegisteredUser table
    const registeredUserQuery = 'INSERT INTO RegisteredUser (person_uid, Username, Password, RegistrationDate, email) VALUES ($1, $2, $3, NOW(), $4)';
    await pool.query(registeredUserQuery, [person_uid, username, password,email]);

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

//get request from the database
app.get('/api/products', async (req, res) => {
  try {
    // Query the database to fetch the products
    const productsQuery = 'SELECT * FROM products';
    const productsResult = await pool.query(productsQuery);

    // Send the products as JSON response
    res.json(productsResult.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

//post request to insert details
app.post('/api/payment-success', async (req, res) => {
  const { email, city, address, product_name, price, cardNumber, cardValidity} = req.body;
  try {

    // Insert payment details into the Orders table
    const query = `
      INSERT INTO Orders (order_uid, email, city, address, product_name, price, purchase_date, card_number, card_validity)
      VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7, $8)
    `;
    await pool.query(query, [uuidv4(), email, city, address, product_name, price, cardNumber, cardValidity]);

    res.status(201).json({ message: 'Payment details inserted successfully' });
  } catch (error) {
    console.error('Error inserting payment details:', error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

// Start the server
const port = process.env.PORT || 5000; 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

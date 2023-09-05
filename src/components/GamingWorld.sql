-- Make Sure you have uuid extension:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Main table:  
CREATE TABLE RegisteredUser (
    person_uid UUID PRIMARY KEY 
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    RegistrationDate DATE,
    UNIQUE (Username)
);
CREATE TABLE Fifa23Scores (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    score INT NOT NULL
);
CREATE TABLE ValorantScores (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    score INT NOT NULL
);

-- Game updates table
CREATE TABLE GameUpdates (
    update_uuid UUID PRIMARY KEY,
    game_name VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE NOT NULL
);
-- Products table
CREATE TABLE Products (
    product_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT,
    type VARCHAR(255) NOT NULL,
    image_path TEXT
);

-- Orders table
CREATE TABLE Orders (
    order_uid UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    city VARCHAR,
    address VARCHAR,
    product_name VARCHAR,
    price INT,
    purchase_date DATE NOT NULL,
    card_number VARCHAR(19) NOT NULL,
    validity DATE
);

-- Contact table
CREATE TABLE Contact (
    contact_uid uuid PRIMARY KEY,
    first_name VARCHAR(15),
    last_name VARCHAR(15),
    phone_number VARCHAR(10) NOT NULL,
    email VARCHAR(255) NOT NULL
);
CREATE TABLE leaderboard (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    score INTEGER NOT NULL
);
CREATE TABLE IndividualScores (
    score_id UUID PRIMARY KEY,
    registered_user_uid UUID NOT NULL REFERENCES RegisteredUser(person_uid),
    game_name VARCHAR(255) NOT NULL,
    score INT NOT NULL CHECK (score >= 0),
    -- Assuming scores are non-negative
    submission_date DATE NOT NULL,
    UNIQUE (registered_user_uid, game_name)
);
   
-- Inserting data into Products
INSERT INTO products (product_id, name, price, type, image_path)
VALUES
  (1, 'Hyperx Cloud 2 red Gaming Headset', 300.0, 'Headphones', './products/product1.jpg'),
  (2, 'Logitech G332 Gaming Headset', 200.0, 'Headphones', './products/product2.jpg'),
  (3, 'Logitech G502 Proteus Spectrum', 329.0, 'Mouse', './products/product3.jpg'),
  (4, 'Logitech G Pro Wireless', 354.0, 'Mouse', './products/product4.png'),
  (5, 'Razer Firefly Hard V2 RGB Gaming Mouse Pad', 39.99, 'Gamepad', './products/product5.jpg'),
  (6, 'XBox Elite Series 2', 399.0, 'GameController', './products/product6.jpeg'),
  (7, 'SteelSeries Apex 7 Red Switch', 350.0, 'Keyboard', './products/product7.jpg'),
  (8, 'Logitech G513 Mechanical Gaming Keyboard', 530.0, 'Keyboard', './products/product8.jpg'),
  (9, 'Logitech G903 Lightspeed Hero', 294.0, 'Mouse', './products/product9.jpg'),
  (10, 'Lenovo Legion M600 RGB', 170.0, 'Mouse', './products/product10.jpg'),
  (11, 'Corsair M65 RGB ULTRA WIRELES Tunable FPS', 470.0, 'Mouse', './products/product11.jpg'),
  (12, 'Logitech G603 Lightspeed WIRELES Mouse', 230.0, 'Mouse', './products/product12.jpg'),
  (13, 'Corsair K55 RGB PRO', 174.0, 'Keyboard', './products/product13.jpg'),
  (14, 'Corsair K70 RGB TKL CHAMPION with OPX SWITCHES', 470.0, 'Keyboard', './products/product14.jpg'),
  (15, 'Dragon RGB GPDRA-K18', 119.0, 'Keyboard', './products/product15.jpg'),
  (16, 'Logitech G Pro Tenkeyless GX Blue Switch', 670.0, 'Keyboard', './products/product16.jpg'),
  (17, 'Roccat Magma Membrane Gaming Keyboard RGB', 210.0, 'Keyboard', './products/product17.jpg'),
  (18, 'SteelSeries rival 650 Gaming Mouse', 423.0, 'Mouse', './products/product18.png'),
  (19, 'SteelSeries Arctis Pro Gaming Headset', 730.0, 'Headphones', './products/product19.jpg'),
  (20, 'Corsair MM350 Champion Series Mouse - Medium Pad', 81.0, 'Gamepad', './products/product20.jpg')

--inserting data into RegisteredUser table
INSERT INTO RegisteredUser ( Username, Password,email, RegistrationDate)
VALUES 
    ('or12','12345','or12@gmail.com','2023-08-01'),
    ('erik','12345','erik@gmail.com','2023-08-05')
        


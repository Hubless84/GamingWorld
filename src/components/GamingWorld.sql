-- Make Sure you have uuid extension:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Main table: Person
CREATE TABLE Person (
    person_uid UUID NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone_number VARCHAR(10),
    registration_status VARCHAR(15) NOT NULL CHECK (
        registration_status IN ('Unregistered', 'Registered')
    ),
    UNIQUE (email),
    UNIQUE (phone_number)
);
-- Sub table: RegisteredUser
CREATE TABLE RegisteredUser (
    person_uid UUID PRIMARY KEY REFERENCES Person(person_uid),
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
-- Competitions table
CREATE TABLE Competitions (
    competition_uid UUID PRIMARY KEY,
    game_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    prize_money MONEY NOT NULL CHECK (prize_money > '0'::MONEY)
);
-- Game updates table
CREATE TABLE GameUpdates (
    update_uuid UUID PRIMARY KEY,
    game_name VARCHAR(255) NOT NULL,
    description TEXT,
    release_date DATE NOT NULL
);
-- Product table
CREATE TABLE Products (
    product_id int PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price MONEY NOT NULL CHECK (price > '0'::MONEY),
    type VARCHAR(255) NOT NULL,
    image TEXT
);
-- Credit card table
CREATE TABLE CreditCards (
    card_number VARCHAR(19) PRIMARY KEY,
    -- Typically, card numbers are 16 digits, but can be up to 19.
    validity DATE NOT NULL,
    CVV INT NOT NULL,
    -- DO NOT store CVV for security reasons, This is illegal (Arye) For school project only
    owner_id UUID NOT NULL REFERENCES Person(person_uid)
);
-- Orders table
CREATE TABLE Orders (
    order_uid UUID PRIMARY KEY,
    user_uid UUID NOT NULL,
    purchase_date DATE NOT NULL
);
-- Sub table: UnregisteredUser
CREATE TABLE UnregisteredUser (
    person_uid UUID PRIMARY KEY REFERENCES Person(person_uid)
);
CREATE TABLE PersonCompetitions (
    person_competition_uid UUID PRIMARY KEY,
    person_uid UUID NOT NULL REFERENCES Person(person_uid),
    competition_uid UUID NOT NULL REFERENCES Competitions(competition_uid),
    UNIQUE (person_uid, competition_uid) -- This ensures that a person can't be registered in the same competition more than once
);
CREATE TABLE OrderProducts (
    order_product_uid UUID PRIMARY KEY,
    order_uid UUID NOT NULL REFERENCES Orders(order_uid),
    product_uid UUID NOT NULL REFERENCES Products(product_uid),
    quantity INT NOT NULL CHECK (quantity > 0),
    UNIQUE (order_uid, product_uid) 
);
-- Payment table
CREATE TABLE Payments (
    order_uid UUID PRIMARY KEY REFERENCES Orders(order_uid),
    card_number VARCHAR(19) NOT NULL REFERENCES CreditCards(card_number),
    price MONEY NOT NULL CHECK (price > '0'::MONEY),
    payment_date DATE NOT NULL
);
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
score INT NOT NULL -- Inserting data into Person
INSERT INTO Person (
        person_uid,
        name,
        email,
        phone_number,
        registration_status
    )
VALUES (
        uuid_generate_v4(),
        'John Doe',
        'john.doe@example.com',
        '+1234567890',
        'Registered'
    ),
    (
        uuid_generate_v4(),
        'Jane Smith',
        'jane.smith@example.com',
        '+0987654321',
        'Unregistered'
    ),
    (
        uuid_generate_v4(),
        'Ella White',
        'ella.white@example.com',
        '+1122334455',
        'Registered'
    ),
    (
        uuid_generate_v4(),
        'Lucas Green',
        'lucas.green@example.com',
        '+2233445566',
        'Unregistered'
    ),
    (
        uuid_generate_v4(),
        'Emily Brown',
        'emily.brown@example.com',
        '+3344556677',
        'Registered'
    );
-- Inserting data into Competitions
INSERT INTO Competitions (
        competition_uid,
        game_name,
        start_date,
        end_date,
        prize_money
    )
VALUES (
        uuid_generate_v4(),
        'Space Invaders',
        '2023-08-01',
        '2023-08-31',
        500.00
    ),
    (
        uuid_generate_v4(),
        'Pac-Man',
        '2023-09-01',
        '2023-09-30',
        600.00
    ),
    (
        uuid_generate_v4(),
        'Tetris',
        '2023-07-01',
        '2023-07-31',
        400.00
    ),
    (
        uuid_generate_v4(),
        'Mario Bros',
        '2023-10-01',
        '2023-10-31',
        700.00
    ),
    (
        uuid_generate_v4(),
        'Zelda',
        '2023-06-01',
        '2023-06-30',
        800.00
    );
-- Inserting data into GameUpdates
INSERT INTO GameUpdates (
        update_uuid,
        game_name,
        description,
        release_date
    )
VALUES (
        uuid_generate_v4(),
        'Space Invaders',
        'Added new levels and power-ups',
        '2023-08-15'
    ),
    (
        uuid_generate_v4(),
        'Pac-Man',
        'Introduced ghost AI improvements',
        '2023-09-10'
    ),
    (
        uuid_generate_v4(),
        'Tetris',
        'New block designs and backgrounds',
        '2023-07-20'
    ),
    (
        uuid_generate_v4(),
        'Mario Bros',
        'New worlds and characters',
        '2023-10-10'
    ),
    (
        uuid_generate_v4(),
        'Zelda',
        'Major storyline update',
        '2023-06-15'
    );
    
-- Inserting data into Products
INSERT INTO Products (product_id, name, price, type, image)
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
  (15, 'Dragon RGB GPDRA-K18', 119.0, 'Keyboard', 'product15.jpg'),
  (16, 'Logitech G Pro Tenkeyless GX Blue Switch', 670.0, 'Keyboard', './products/product16.jpg'),
  (17, 'Roccat Magma Membrane Gaming Keyboard RGB', 210.0, 'Keyboard', './products/product17.jpg'),
  (18, 'SteelSeries rival 650 Gaming Mouse', 423.0, 'Mouse', './products/product18.png'),
  (19, 'SteelSeries Arctis Pro Gaming Headset', 730.0, 'Headphones', './products/product19.jpg'),
  (20, 'Corsair MM350 Champion Series Mouse - Medium Pad', 81.0, 'Gamepad', './products/product20.jpg')

-- Inserting data into CreditCards
INSERT INTO CreditCards (card_number, validity, CVV, owner_id)
VALUES (
        '1234567812345678',
        '2026-08-31',
        123,
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'John Doe'
        )
    ),
    (
        '2345678923456789',
        '2027-08-31',
        456,
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Ella White'
        )
    ),
    (
        '3456789034567890',
        '2025-08-31',
        789,
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Emily Brown'
        )
    );
-- Inserting data into Orders
INSERT INTO Orders (order_uid, user_uid, purchase_date)
VALUES (
        uuid_generate_v4(),
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'John Doe'
        ),
        '2023-08-10'
    ),
    (
        uuid_generate_v4(),
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Ella White'
        ),
        '2023-08-12'
    ),
    (
        uuid_generate_v4(),
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Emily Brown'
        ),
        '2023-08-14'
    );
-- Inserting data into UnregisteredUser and RegisteredUser
INSERT INTO UnregisteredUser (person_uid)
VALUES (
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Jane Smith'
        )
    ),
    (
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Lucas Green'
        )
    );
INSERT INTO RegisteredUser (person_uid, Username, Password, RegistrationDate)
VALUES (
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'John Doe'
        ),
        'johnDoe123',
        'securePassword',
        '2023-08-01'
    ),
    (
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Ella White'
        ),
        'ellaWhite456',
        'anotherPassword',
        '2023-08-03'
    ),
    (
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Emily Brown'
        ),
        'emilyBrown789',
        'yetAnotherPassword',
        '2023-08-05'
    );
-- Inserting data into PersonCompetitions
INSERT INTO PersonCompetitions (
        person_competition_uid,
        person_uid,
        competition_uid
    )
VALUES (
        uuid_generate_v4(),
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'John Doe'
        ),
        (
            SELECT competition_uid
            FROM Competitions
            WHERE game_name = 'Space Invaders'
        )
    ),
    (
        uuid_generate_v4(),
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Ella White'
        ),
        (
            SELECT competition_uid
            FROM Competitions
            WHERE game_name = 'Pac-Man'
        )
    ),
    (
        uuid_generate_v4(),
        (
            SELECT person_uid
            FROM Person
            WHERE name = 'Emily Brown'
        ),
        (
            SELECT competition_uid
            FROM Competitions
            WHERE game_name = 'Zelda'
        )
    );
-- Inserting data into OrderProducts
INSERT INTO OrderProducts (
        order_product_uid,
        order_uid,
        product_uid,
        quantity
    )
VALUES (
        uuid_generate_v4(),
        (
            SELECT order_uid
            FROM Orders
            WHERE user_uid = (
                    SELECT person_uid
                    FROM Person
                    WHERE name = 'John Doe'
                )
        ),
        (
            SELECT product_uid
            FROM Products
            WHERE name = 'Gaming Mouse'
        ),
        1
    ),
    (
        uuid_generate_v4(),
        (
            SELECT order_uid
            FROM Orders
            WHERE user_uid = (
                    SELECT person_uid
                    FROM Person
                    WHERE name = 'Ella White'
                )
        ),
        (
            SELECT product_uid
            FROM Products
            WHERE name = 'Gaming Keyboard'
        ),
        1
    ),
    (
        uuid_generate_v4(),
        (
            SELECT order_uid
            FROM Orders
            WHERE user_uid = (
                    SELECT person_uid
                    FROM Person
                    WHERE name = 'Emily Brown'
                )
        ),
        (
            SELECT product_uid
            FROM Products
            WHERE name = 'Zelda Poster'
        ),
        2
    );
-- Inserting data into Payments
INSERT INTO Payments (order_uid, card_number, price, payment_date)
VALUES (
        (
            SELECT order_uid
            FROM Orders
            WHERE user_uid = (
                    SELECT person_uid
                    FROM Person
                    WHERE name = 'John Doe'
                )
        ),
        '1234567812345678',
        50.00,
        '2023-08-10'
    ),
    (
        (
            SELECT order_uid
            FROM Orders
            WHERE user_uid = (
                    SELECT person_uid
                    FROM Person
                    WHERE name = 'Ella White'
                )
        ),
        '2345678923456789',
        70.00,
        '2023-08-12'
    ),
    (
        (
            SELECT order_uid
            FROM Orders
            WHERE user_uid = (
                    SELECT person_uid
                    FROM Person
                    WHERE name = 'Emily Brown'
                )
        ),
        '3456789034567890',
        120.00,
        '2021-02-01'
    );